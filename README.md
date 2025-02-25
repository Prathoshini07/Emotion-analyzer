# Emotion-analyzer
 Project Overview: Customer Emotion Analysis System (MERN Stack)
The Customer Emotion Analysis System is a MERN-stack-based application designed to analyze customer feedback using Natural Language Processing (NLP). It processes textual data to identify emotions, extract topics, and generate sentiment trends. Users can either manually enter feedback or upload an PDF file containing customer reviews for batch processing. The system provides interactive visualizations using Chart.js, displaying emotion distributions, sentiment trends, and intensity over time.

🚀 Features of the Project
1️⃣ Real-Time Emotion Analysis
Users enter text feedback, and the system classifies emotions (e.g., joy, anger, disappointment, happy, neutral).
Uses bert-base-multilingual-uncased NLP model for multilingual sentiment detection.

📌 Model Breakdown:
Base Model:

bert-base-multilingual-uncased → A multilingual BERT model trained on 104 languages.
Uncased → Treats uppercase and lowercase letters the same.
Fine-Tuned Task:

This specific model is fine-tuned for sentiment classification (positive, neutral, negative).
Used for text classification tasks such as emotion detection and sentiment analysis.

2️⃣ Interactive Dashboard with Graphs
Pie Charts: Show overall sentiment distribution.
Bar Charts: Display positive, negative, and neutral feedback.
Line Charts: Track sentiment trends over time.
Word Cloud: Highlights frequently occurring words in feedback.
3️⃣ PDF File Upload for Bulk Analysis
Users upload an PDF file (.pdf) containing customer feedback.
The system extracts the feedback , processes each line, and generates aggregated sentiment analysis through charts.
4️⃣ Backend with Database Storage
Stores customer feedback and analysis results in a MongoDB database.
Uses Express.js as the backend framework and Mongoose for database interaction.
5️⃣ User-Friendly UI
Built with React.js, featuring a modern, animated, and interactive interface.
Uses floating emoji effects, glassmorphism UI, and sleek styling.

.
🔧 Full Setup Instructions (Step-by-Step Guide)
1️⃣ Clone the Repository
First, download the project to your local machine:

git clone https://github.com/Prathoshini07/Emotion-analyzer.git
cd Customer-Emotion-Analysis

2️⃣ Backend Setup (Express + MongoDB)
📌 Install Dependencies
Navigate to the backend folder and install required dependencies:

cd backend
npm install

📌 Required Dependencies
Package	Description
express	Backend framework for handling routes.
mongoose	MongoDB ODM (Object Document Mapper).
cors	Allows frontend-backend communication.
dotenv	Loads environment variables.
multer	Handles file uploads.
pdf-parse	Parses PDF files.

npm install express mongoose cors dotenv multer pdf-parse

📌 Configure Environment Variables
Create a .env file inside the backend/ directory:

MONGO_URI=your_mongodb_connection_string
PORT=5000

📌 Start the Backend Server
Run:

npm start

If MongoDB is running correctly, you should see:

Server running on port 5000
Connected to MongoDB

3️⃣ Frontend Setup (React.js)
📌 Install Dependencies
Navigate to the frontend folder and install the required dependencies:

cd ../frontend
npm install

📌 Required Dependencies
Package	Description
react-router-dom	Handles frontend routing (dashboard, upload page).
axios	Makes API requests to the backend.
chart.js	Used for data visualization.
react-chartjs-2	React wrapper for Chart.js.
react-wordcloud	Generates word clouds from feedback.

npm install react-router-dom axios chart.js react-chartjs-2 react-wordcloud

📌 Start the Frontend Server
Run:

npm start
This will launch the React application at http://localhost:3000.

4️⃣ Routes and API Endpoints
Endpoint	Method	Description
/api/emotions/analyze	POST	Analyze text input and return sentiment analysis.
/api/emotions/feedback	GET	Retrieve all stored feedback.
/api/emotions/analytics	GET	Fetch analytics data (graphs, charts).
/api/emotions/analyze-file	POST	Upload PDF file for bulk analysis.

5️⃣ How to Use the Application
📌 Analyzing a Single Feedback
Open the frontend at http://localhost:3000.
Enter a customer review in the text box.
Click "Analyze" to view sentiment results.
📌 Viewing Analytics
Click "Go to Analytics Dashboard".
See charts and trends of customer feedback.
📌 Uploading an Excel File
Click "Analyze PDF File".
Select a PDF file(.pdf) with customer feedbacks.
View aggregated sentiment analysis as charts.
