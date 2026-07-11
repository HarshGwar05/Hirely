import express from "express";
import upload from "../config/multer.js";
import { uploadResumes } from "../controllers/resumeController.js";

const router = express.Router();

router.post(
    "/upload",
    upload.array("resumes"),
    uploadResumes
);

export default router;