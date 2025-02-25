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
export const getAnalyticsData = async (req, res) => {
  try {
    // 🟢 Count total feedback entries
    const totalFeedback = await Emotion.countDocuments();

    // 🟢 Aggregate the most common emotions
    const emotionCounts = await Emotion.aggregate([
      { $group: { _id: "$emotions.primary.emotion", count: { $sum: 1 } } },
      { $sort: { count: -1 } } // Sort by most frequent
    ]);

    const mostCommonEmotion = emotionCounts.length > 0 ? emotionCounts[0]._id : "Neutral";

    // 🟢 Compute average sentiment score
    const avgSentiment = await Emotion.aggregate([
      { $group: { _id: null, avgScore: { $avg: "$adorescore.overall" } } }
    ]);
    const averageSentiment = avgSentiment.length > 0 ? avgSentiment[0].avgScore : 50; // Default to 50 if no data

    // 🟢 Emotion Distribution
    const emotionDistribution = {};
    emotionCounts.forEach((entry) => {
      emotionDistribution[entry._id] = entry.count;
    });

    // 🟢 Sentiment Trend Analysis (Last 5 feedbacks)
    const last5Entries = await Emotion.find().sort({ _id: -1 }).limit(5);
    const sentimentTrend = {
      labels: last5Entries.map((entry, index) => `Feedback ${index + 1}`),
      data: last5Entries.map((entry) => entry.adorescore.overall)
    };

    // 🟢 Response Data
    const analyticsData = {
      totalFeedback,
      averageSentiment: parseFloat(averageSentiment.toFixed(2)),
      mostCommonEmotion,
      emotionDistribution,
      sentimentTrend
    };

    res.status(200).json(analyticsData);

  } catch (error) {
    console.error("Error fetching analytics:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
