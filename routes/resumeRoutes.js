import express from "express";
import upload from "../config/multer.js";

import {
    uploadResumes,
    deleteResume,
    restoreArchivedResume
} from "../controllers/resumeController.js";

const router = express.Router();

router.post(
    "/upload",
    upload.array("resumes"),
    uploadResumes
);
router.post(
    "/:resumeId/restore",
    restoreArchivedResume
);
router.delete(
    "/:resumeId",
    deleteResume
);

export default router;