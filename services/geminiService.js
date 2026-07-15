import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const generateWithRetry = async (prompt) => {

    const maxRetries = 3;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {

        try {

            const response = await ai.models.generateContent({

                model: "gemini-2.5-flash",

                contents: prompt

            });

            return response.text;

        } catch (err) {

            const retryable =

                err.status === 503 ||

                err.status === 500 ||

                err.status === 502 ||

                err.status === 504 ||

                err.cause?.code === "UND_ERR_CONNECT_TIMEOUT" ||

                err.code === "ETIMEDOUT" ||

                err.code === "ECONNRESET";

            if (retryable && attempt < maxRetries) {

                const waitTime = attempt * 5000;

                console.log(

                    `Gemini temporarily unavailable. Retry ${attempt}/${maxRetries} in ${waitTime / 1000}s...`

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

    try {

        return JSON.parse(cleanedResponse);

    } catch (err) {

        console.error("Failed to parse Gemini Stage 1 response:", cleanedResponse);

        throw new Error("Gemini returned malformed JSON during resume parsing.");

    }

};



//stage 2 the above is stge 1

export const matchCandidateWithJob = async (
    candidateProfile,
    jobDescription
) => {

const prompt = `
You are an experienced technical recruiter.

Evaluate the candidate holistically against the job description.

Do NOT reject a candidate only because a few technologies are missing.
Consider:
- relevant projects
- transferable skills
- education
- practical experience
- technical knowledge
- problem-solving ability
- overall potential

Return ONLY valid JSON.

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
  "evidence":[
    {
      "requirement":"",
      "evidence":""
    }
  ]
}

Rules

1. Score must be between 0.0 and 10.0 (0.5 increments).

Score Guide

9-10
Excellent fit.
Most requirements satisfied.
Strong projects and experience.

7-8.5
Good fit.
Missing a few skills but can contribute immediately.

5-6.5
Partial fit.
Has relevant knowledge/projects but lacks several required skills.
Suitable for interview or further evaluation.

3-4.5
Weak fit.
Some transferable skills but major gaps.

0-2.5
Very poor fit.
Almost no relevant evidence.

2. Decision

9-10 -> STRONG_MATCH
7-8.5 -> GOOD_MATCH
5-6.5 -> REVIEW
0-4.5 -> REJECT

3. Confidence

Use only:
40
60
75
90
95

Confidence means confidence in YOUR evaluation, not candidate quality.

4. Requirement Coverage

Estimate what percentage of explicit job requirements are satisfied.

5. Summary

Maximum 60 words.

6. Lists

strengths
weaknesses
missing_skills
interview_questions
improvement_suggestions

Return 2-5 concise items.

7. Evidence

For every important job requirement provide resume evidence.
If evidence is missing, explicitly state:
"Not found in resume."

8. Important

Reward relevant academic projects, internships and transferable skills.

Do NOT heavily penalize candidates for missing optional technologies if they demonstrate related knowledge.

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

    try {

        return JSON.parse(cleanedResponse);

    } catch (err) {

        console.error("Failed to parse Gemini Stage 2 response:", cleanedResponse);

        throw new Error("Gemini returned malformed JSON during candidate matching.");

    }

};