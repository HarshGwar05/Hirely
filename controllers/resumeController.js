import { saveResume } from "../services/resumeService.js";

export const uploadResumes = async (req, res) => {

    try {

        const files = req.files;

        if (!files || files.length === 0) {

            return res.status(400).send("Please upload at least one PDF.");

        }

        await Promise.all(
            files.map(file => saveResume(file))
        );

        res.redirect("/");

    } catch (err) {

        console.error(err);

        res.status(500).send("Failed to upload resumes.");

    }

};