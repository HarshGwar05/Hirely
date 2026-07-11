import { getScreeningProgress } from "../services/progressService.js";

export const showProgress = async (req, res) => {

    try {

        const data = await getScreeningProgress(
            req.params.screeningId
        );

        if (!data.screening) {

            return res.status(404).send("Screening not found.");

        }

        res.render("progress", {

            screening: data.screening,

            resumes: data.resumes

        });

    } catch (err) {

        console.error(err);

        res.status(500).send("Internal Server Error");

    }

};