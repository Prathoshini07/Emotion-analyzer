import express from "express";
import { analyzeText, getAllFeedback, getAnalyticsData } from "../controllers/emotionController.js"; 

const router = express.Router();

router.post("/analyze", analyzeText);
router.get("/feedback", getAllFeedback);
router.get("/analytics", getAnalyticsData);
export default router;
