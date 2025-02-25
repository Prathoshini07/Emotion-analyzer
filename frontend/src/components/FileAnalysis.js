import React, { useState } from "react";
import axios from "axios";
import { Pie, Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "./FileAnalysis.css";

Chart.register(...registerables);

const FileAnalysis = () => {
  const [file, setFile] = useState(null);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Upload file to backend for analysis
  const uploadFile = async () => {
    if (!file) return alert("Please upload a PDF file!");

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const { data } = await axios.post("http://localhost:5000/api/emotions/analyze-file", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setAnalyticsData(data);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to analyze PDF.");
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Processing PDF feedback...</p>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="file-upload-container">
        <h2>Upload PDF for Emotion Analysis</h2>
        <input type="file" accept=".pdf" onChange={handleFileChange} />
        <button onClick={uploadFile} disabled={loading}>
          {loading ? "Processing..." : "Analyze PDF"}
        </button>
      </div>
    );
  }

  // 🟢 Emotion Distribution Chart
  const emotionDistributionData = analyticsData.emotionDistribution || {};
  const emotionDistribution = {
    labels: Object.keys(emotionDistributionData),
    datasets: [
      {
        label: "Emotion Distribution",
        data: Object.values(emotionDistributionData),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
        hoverOffset: 6,
      },
    ],
  };

  // 🟢 Sentiment Trend Chart
  const sentimentTrendData = analyticsData.sentimentTrend || { labels: [], data: [] };
  const sentimentTrend = {
    labels: sentimentTrendData.labels,
    datasets: [
      {
        label: "Sentiment Score",
        data: sentimentTrendData.data,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "#36A2EB",
        borderWidth: 3,
        hoverBackgroundColor: "#4BC0C0",
        tension: 0.3,
      },
    ],
  };

  // 🟢 Sentiment Distribution (Positive, Neutral, Negative)
  const positiveEmotions = ["joy", "happy"];
  const negativeEmotions = ["anger", "disappointment"];
  let positiveCount = 0,
    neutralCount = 0,
    negativeCount = 0;

  Object.entries(emotionDistributionData).forEach(([emotion, count]) => {
    if (positiveEmotions.includes(emotion.toLowerCase())) {
      positiveCount += count;
    } else if (negativeEmotions.includes(emotion.toLowerCase())) {
      negativeCount += count;
    } else {
      neutralCount += count;
    }
  });

  const sentimentDistribution = {
    labels: ["Positive", "Neutral", "Negative"],
    datasets: [
      {
        label: "Sentiment Distribution",
        data: [positiveCount, neutralCount, negativeCount],
        backgroundColor: ["#28a745", "#ffc107", "#dc3545"],
      },
    ],
  };

  return (
    <div className="file-analysis-page">
      <div className="file-analysis-dashboard">
        <h1>📑 PDF Feedback Analysis</h1>

        {/* Metrics Section */}
        <div className="metrics-container">
          <div className="metric-card fade-in">
            <h3>Total Feedback</h3>
            <p>{analyticsData.totalFeedback || 0}</p>
          </div>
          <div className="metric-card fade-in">
            <h3>Average Sentiment</h3>
            <p>{analyticsData.averageSentiment ? analyticsData.averageSentiment.toFixed(2) : "N/A"}</p>
          </div>
          <div className="metric-card fade-in">
            <h3>Most Common Emotion</h3>
            <p>{analyticsData.mostCommonEmotion || "N/A"}</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="chart-section">
          <div className="chart-row">
            {emotionDistribution.labels.length > 0 && (
              <div className="chart-container fade-in">
                <h2>Emotion Distribution</h2>
                <Pie data={emotionDistribution} options={{ maintainAspectRatio: false }} />
              </div>
            )}

            {sentimentTrend.labels.length > 0 && (
              <div className="chart-container fade-in">
                <h2>Sentiment Trend Over Time</h2>
                <Line data={sentimentTrend} options={{ maintainAspectRatio: false }} />
              </div>
            )}
          </div>

          {/* Sentiment Distribution Pie Chart */}
          {sentimentDistribution.datasets[0].data.some((value) => value > 0) && (
            <div className="chart-container fade-in">
              <h2>Sentiment Distribution</h2>
              <Pie data={sentimentDistribution} options={{ maintainAspectRatio: false }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileAnalysis;
