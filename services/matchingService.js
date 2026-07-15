import { matchCandidateWithJob } from "./geminiService.js";

import {
    getScreening,
    saveScreeningResult
} from "./screeningService.js";


export const processMatching = async (
    screeningId,
    screeningResumeId,
    candidateProfile
) => {

    const screening = await getScreening(
        screeningId
    );

    if (!screening) {

        throw new Error("Screening not found.");

    }
    if (process.env.DEBUG) {

        console.log("\n========== CANDIDATE PROFILE ==========");
        console.log(
            JSON.stringify(candidateProfile, null, 2)
        );
        console.log("=======================================\n");
        console.log("Sending to Gemini Stage 2...");

    }

    const result = await matchCandidateWithJob(

        candidateProfile,

        screening.job_description

    );

    if (process.env.DEBUG) {

        console.log("Gemini Stage 2 finished.");
        console.log(result);

    }

    await saveScreeningResult(

        screeningResumeId,

        result

    );

};