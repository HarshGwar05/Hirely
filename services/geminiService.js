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

Evaluate how well the candidate matches the job.

Return ONLY valid JSON.

Do not include markdown.
Do not include explanations.
Do not wrap inside \`\`\`.

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

IMPORTANT SCORING RULES

- Score must be a decimal number between 0.00 and 10.00.
- Use two decimal places whenever appropriate.
- 10.00 = perfect match.
- 8.00-9.99 = excellent match.
- 6.00-7.99 = good match.
- 4.00-5.99 = average match.
- Below 4.00 = poor match.

Decision must be one of:

STRONG_MATCH
GOOD_MATCH
REVIEW
REJECT

Candidate Profile:

${JSON.stringify(candidateProfile, null, 2)}

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