import express from "express";

import {
    startScreening,
    getScreeningStatus,
    showScreeningResults,
    showResultDetails
} from "../controllers/screeningController.js";

const router = express.Router();

router.post(
    "/",
    startScreening
);

router.get(
    "/:screeningId/status",
    getScreeningStatus
);
router.get(
    "/:screeningId/results",
    showScreeningResults
);
router.get(
    "/result/:screeningResumeId",
    showResultDetails
);
export default router;