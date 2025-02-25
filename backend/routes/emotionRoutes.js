import express from "express";
import { analyzeText, getAllFeedback } from "../controllers/emotionController.js";

const router = express.Router();

router.post("/analyze", analyzeText);
router.get("/feedback", getAllFeedback);

export default router;
