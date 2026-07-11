import express from "express";
import { showProgress } from "../controllers/progressController.js";

const router = express.Router();

router.get("/:screeningId", showProgress);

export default router;