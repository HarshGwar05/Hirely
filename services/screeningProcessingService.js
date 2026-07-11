import {
    getScreeningResumes
} from "./resumeService.js";

import {
    updateScreeningStatus,
    updateScreeningResumeStatus,
    incrementCompletedResumes,
    incrementFailedResumes
} from "./screeningService.js";

export const processScreening = async (screeningId) => {

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

                // Temporary delay
                await new Promise(resolve =>
                    setTimeout(resolve, 1000)
                );

                await updateScreeningResumeStatus(
                    resume.screening_resume_id,
                    "MATCHING"
                );

                await new Promise(resolve =>
                    setTimeout(resolve, 1000)
                );

                await updateScreeningResumeStatus(
                    resume.screening_resume_id,
                    "COMPLETED"
                );

                await incrementCompletedResumes(
                    screeningId
                );

            } catch (err) {

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