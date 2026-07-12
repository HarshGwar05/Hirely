import { processMatching } from "./matchingService.js";
import {
     getScreeningResumes,
    getParsedResume
} from "./resumeService.js";

import {
    updateScreeningStatus,
    updateScreeningResumeStatus,
    incrementCompletedResumes,
    incrementFailedResumes
} from "./screeningService.js";


export const processScreening = async (screeningId) => {
    console.log("PROCESS SCREENING STARTED:",screeningId);

    try {

        await updateScreeningStatus(
            screeningId,
            "PROCESSING"
        );

        const resumes = await getScreeningResumes(
            screeningId
        );

        for (const resume of resumes) {

            try {

                await updateScreeningResumeStatus(
    resume.screening_resume_id,
    "PARSING"
);

const parsedResume = await getParsedResume(
    resume.resume_id
);

if (!parsedResume) {

    console.log(
        `ParsedResume missing for ${resume.resume_id}`
    );

    await updateScreeningResumeStatus(
        resume.screening_resume_id,
        "FAILED"
    );

    await incrementFailedResumes(
        screeningId
    );

    continue;

}

const candidateProfile =
    typeof parsedResume.parsed_data === "string"
        ? JSON.parse(parsedResume.parsed_data)
        : parsedResume.parsed_data;

if (
    !candidateProfile ||
    Object.keys(candidateProfile).length === 0
) {

    console.log(
        `Candidate profile missing for ${resume.resume_id}`
    );

    await updateScreeningResumeStatus(
        resume.screening_resume_id,
        "FAILED"
    );

    await incrementFailedResumes(
        screeningId
    );

    continue;

} 

                await updateScreeningResumeStatus(
                    resume.screening_resume_id,
                    "MATCHING"
                );
                
                console.log("Calling Stage 2:", resume.screening_resume_id);
                
                await processMatching(

                    screeningId,

                    resume.screening_resume_id,

                    candidateProfile

                );
                console.log("Stage 2 Finished:", resume.screening_resume_id);

                await updateScreeningResumeStatus(
                    resume.screening_resume_id,
                    "COMPLETED"
                );

                await incrementCompletedResumes(
                    screeningId
                );

            } catch (err) {

    console.error("STAGE 2 FAILED");
    console.error(err);

    await updateScreeningResumeStatus(
        resume.screening_resume_id,
        "FAILED"
    );

    await incrementFailedResumes(
        screeningId
    );

}

        }

        await updateScreeningStatus(
            screeningId,
            "COMPLETED"
        );

    } catch (err) {

        console.error(err);

        await updateScreeningStatus(
            screeningId,
            "FAILED"
        );

    }

};

