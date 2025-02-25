import React, { useState } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "./UploadFile.css";

Chart.register(...registerables);

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [chartData, setChartData] = useState(null);

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    if (!file) return alert("Please select a file first.");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const { data } = await axios.post("http://localhost:5000/api/emotions/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setChartData(data);
    } catch (error) {
      console.error("Error processing file:", error);
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Feedback Excel</h2>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      <button onClick={uploadFile}>Analyze</button>

      {chartData && (
        <div className="chart-section">
          <div className="chart-container">
            <h3>Emotion Distribution</h3>
            <Pie
              data={{
                labels: Object.keys(chartData.emotionDistribution),
                datasets: [
                  {
                    label: "Emotion Distribution",
                    data: Object.values(chartData.emotionDistribution),
                    backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
                  },
                ],
              }}
            />
          </div>

          <div className="chart-container">
            <h3>Sentiment Trend</h3>
            <Bar
              data={{
                labels: chartData.sentimentTrend.labels,
                datasets: [
                  {
                    label: "Sentiment Over Time",
                    data: chartData.sentimentTrend.data,
                    backgroundColor: "#36A2EB",
                  },
                ],
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadFile;
