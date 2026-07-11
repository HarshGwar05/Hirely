import { redactPII } from "./piiRedactionService.js";
import { extractCandidateProfile } from "./geminiService.js";

export const extractCandidate = async (rawText) => {

    const redactedResume = redactPII(rawText);

    return await extractCandidateProfile(
        redactedResume
    );

};