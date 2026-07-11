import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

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

    const response = await ai.models.generateContent({

        model: "gemini-2.5-flash",

        contents: prompt

    });

   const cleanedResponse = response.text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

    return JSON.parse(cleanedResponse);

};