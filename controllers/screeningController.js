import { createScreening } from "../services/screeningService.js";

export const startScreening = async (req, res) => {

    try {

        const {

            jobTitle,
            jobDescription,
            selectedResumeIds

        } = req.body;

        if (
            !jobTitle ||
            !jobDescription ||
            !selectedResumeIds ||
            selectedResumeIds.length === 0
        ) {

            return res
                .status(400)
                .send("Missing screening information.");

        }

        const screeningId = await createScreening(

            jobTitle,
            jobDescription,
            selectedResumeIds

        );

        res.json({

            success: true,

            screeningId

        });

    } catch (err) {

        console.error(err);

        res.status(500).send("Failed to create screening.");

    }

};