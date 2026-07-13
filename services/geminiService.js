import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const generateWithRetry = async (prompt) => {

    const maxRetries = 3;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {

        try {

            const response = await ai.models.generateContent({

                model: "gemini-flash-latest",

                contents: prompt

            });

            return response.text;

        } catch (err) {

            if (
                err.status === 503 &&
                attempt < maxRetries
            ) {

                const waitTime = attempt * 5000;

                console.log(
                    `Gemini busy. Retrying in ${waitTime / 1000}s...`
                );

                await new Promise(resolve =>
                    setTimeout(resolve, waitTime)
                );

                continue;

            }

            throw err;

        }

    }

};

export const extractCandidateProfile = async (resumeText) => {

    const prompt = `
You are an expert ATS resume parser.

Your task is to extract structured candidate information.

Return ONLY valid JSON.

Do not include markdown.
Do not include explanation.
Do not wrap inside \`\`\`.

Schema:

{
  "summary": "",
  "skills": [],
  "experience": [],
  "projects": [],
  "education": [],
  "certifications": []
}

Resume:

${resumeText}
`;

    const responseText =
    await generateWithRetry(prompt);

   const cleanedResponse = responseText
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

    return JSON.parse(cleanedResponse);

};



//stage 2 the above is stge 1

export const matchCandidateWithJob = async (
    candidateProfile,
    jobDescription
) => {

const prompt = `
You are an expert ATS recruiter.

You will receive:
1. A structured candidate profile.
2. A job description.

Evaluate the candidate strictly against the job description.

Return ONLY valid JSON.
No markdown.
No explanations.
No code fences.

JSON Schema:
{
  "score": 0.0,
  "decision": "",
  "confidence": 0,
  "requirement_coverage": 0,
  "summary": "",
  "strengths": [],
  "weaknesses": [],
  "missing_skills": [],
  "interview_questions": [],
  "improvement_suggestions": [],
  "evidence": [
    {
      "requirement": "",
      "evidence": ""
    }
  ]
}

Rules:

- score: decimal between 0.0 and 10.0 using increments of 0.5 only.
  10 = Exceptional fit
  9 = Excellent
  8 = Strong
  7 = Good
  6 = Acceptable
  5 = Average
  4 = Weak
  2-3.5 = Poor
  0-1.5 = No meaningful match

- decision:
  9.0-10.0 -> STRONG_MATCH
  7.0-8.5 -> GOOD_MATCH
  5.0-6.5 -> REVIEW
  0.0-4.5 -> REJECT

- confidence represents confidence in YOUR evaluation, NOT candidate quality.
  Use ONLY:
  20, 40, 60, 75, 90, 100

  100 = Clear evidence for nearly all conclusions.
  90 = Strong evidence with minor assumptions.
  75 = Some assumptions required.
  60 = Limited evidence.
  40 = Weak evidence.
  20 = Mostly guessing.

- requirement_coverage: percentage (0-100) of explicit job requirements satisfied.

- decision must always match the score.

- Keep summary under 70 words.

- strengths, weaknesses, missing_skills, interview_questions and improvement_suggestions should contain 2-5 concise items.

- evidence should map each important job requirement to supporting resume evidence.

Candidate Profile:
${JSON.stringify(candidateProfile)}

Job Description:
${jobDescription}
`;

    const responseText =
    await generateWithRetry(prompt);

    const cleanedResponse = responseText
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    return JSON.parse(cleanedResponse);

};