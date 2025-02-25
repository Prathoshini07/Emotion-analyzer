import Emotion from "../models/emotion.js";
import { analyzeSentiment } from "../utils/emotionProcessor.js"; // ✅ Ensure correct import

export const analyzeText = async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) return res.status(400).json({ error: "Text is required for analysis." });

        // 🟢 Perform real NLP-based emotion analysis (ASYNC)
        const { emotions, topics, adorescore } = await analyzeSentiment(text); // ✅ FIXED: Await the async function

        // 🟢 Save to database
        const analysisResult = new Emotion({
            text,
            emotions,  // ✅ Now directly using "emotions" instead of destructuring
            topics,
            adorescore
        });

        await analysisResult.save();

        return res.status(200).json(analysisResult);

    } catch (error) {
        console.error("Error analyzing text:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// ✅ Fetch all feedback from the database
export const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Emotion.find();
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
