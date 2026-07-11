import crypto from "crypto";
import fs from "fs/promises";

import {
     saveResume,
    saveParsedResume,
    markResumeParsed,
    getResumeByHash,
    getResumeById,
    isResumeUsed,
    archiveResume,
    deleteResumeById
} from "../services/resumeService.js";

import { extractResumeText } from "../services/parseResumeService.js";

export const uploadResumes = async (req, res) => {

    try {

        const files = req.files;

        if (!files || files.length === 0) {

            return res.status(400).send("No files uploaded.");

        }

        for (const file of files) {

            const buffer = await fs.readFile(file.path);

            const fileHash = crypto
                .createHash("sha256")
                .update(buffer)
                .digest("hex");

            const existingResume = await getResumeByHash(fileHash);

           if (existingResume) {
                await fs.unlink(file.path);
                console.log(`Duplicate resume skipped: ${file.originalname}`);
                continue;
            }

            const resumeId = await saveResume(
                file,
                fileHash
            );

            const rawText = await extractResumeText(file.path);

            await saveParsedResume(
                resumeId,
                rawText
            );

            await markResumeParsed(
                resumeId
            );

        }

        res.redirect("/");

    } catch (err) {

        console.error(err);

        res.status(500).send("Failed to upload resumes.");

    }

};

export const deleteResume = async (req, res) => {

    try {

        const { resumeId } = req.params;

        const resume = await getResumeById(resumeId);

        if (!resume) {
            return res.status(404).send("Resume not found.");
        }

        const used = await isResumeUsed(resumeId);

        if (used) {

            await archiveResume(resumeId);

        } else {

            await fs.unlink(resume.storage_path);

            await deleteResumeById(resumeId);

        }

        res.redirect("/");

    } catch (err) {

        console.error(err);

        res.status(500).send("Failed to delete resume.");

    }

};