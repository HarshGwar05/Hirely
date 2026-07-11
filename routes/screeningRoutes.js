import express from "express";
import { startScreening } from "../controllers/screeningController.js";

const router = express.Router();

router.post("/", startScreening);

export default router;