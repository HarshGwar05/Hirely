import express from "express";

import {
    startScreening,
    getScreeningStatus
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

export default router;