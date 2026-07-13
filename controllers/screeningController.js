import {
    createScreening,
    getScreeningStatusData,
    getScreeningResults,
    getResultDetails
} from "../services/screeningService.js";
import { processScreening } from "../services/screeningProcessingService.js";


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

        processScreening(screeningId)
        .catch(console.error);

        res.json({

            success: true,

            screeningId

        });

    } catch (err) {

        console.error(err);

        res.status(500).send("Failed to create screening.");

    }

};

export const getScreeningStatus = async (req, res) => {

    const { screeningId } = req.params;

    const screening = await getScreeningStatusData(screeningId);

    res.json(screening);

};

export const showScreeningResults = async (req, res) => {

    try {

        const results = await getScreeningResults(
            req.params.screeningId
        );

        if (results.length === 0) {

            return res
                .status(404)
                .send("No results found.");

        }

        res.render("results", {

            jobTitle: results[0].job_title,

            results

        });

    } catch (err) {

        console.error(err);

        res.status(500).send("Internal Server Error");

    }

};

export const showResultDetails = async (req, res) => {

    try {

        const result = await getResultDetails(
            req.params.screeningResumeId
        );

        if (!result) {

            return res.status(404).send("Result not found.");

        }

        res.render("report", {

            result

        });

    } catch (err) {

        console.error(err);

        res.status(500).send("Internal Server Error");

    }

};