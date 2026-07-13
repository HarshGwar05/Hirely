import express from "express";

import {
    showHistory
} from "../controllers/historyController.js";

const router = express.Router();

router.get(
    "/",
    showHistory
);

export default router;