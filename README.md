# URL Shortener 

This is a simple URL shortener built with React (Vite) + Tailwind CSS for the frontend and Node.js + Express + MongoDB for the backend.

## 🚀 Features

Shorten long URLs into unique short links

Store shortened URLs in a MongoDB database

Retrieve and track shortened URLs

Update and Delete Urls

## 📂 Project Structure
```
URL-Shortener/
│-- frontend/    # React + Vite frontend
│   ├── src/
│   │   ├── App.jsx     # Main frontend component
│   │   ├── index.css   # Styling (Tailwind)
│   │   ├── main.jsx    # Entry point
│   ├── package.json    # Frontend dependencies
│   ├── vite.config.js  # Vite config
│   └── ...
│
│-- backend/     # Express + MongoDB backend
│   ├── schema.js   # Mongoose schema for storing URLs
│   ├── server.js   # Express server and API endpoints
│   ├── package.json # Backend dependencies
│   └── ...
│
└── README.md   # Project documentation
```
## 🛠 Setup Instructions
Ensure you have Mongodb installed locally
### 1️⃣ Clone the Repository
```
https://github.com/frankkips/Url-Shortener
```
### 2️⃣ Backend Setup
1. Navigate to the Backend folder
```
cd backend
```
2. Install Dependencies
```
npm install
```
3. Start your Backend Server
```
npm start
```
## 3️⃣ Frontend Setup
1. Navigate to the front end folder
```
cd Frontend
```
2. Install Dependecies
```
npm instal
```
3. Start your front end server
```
npm run dev
```
The front end server will run on https://localhost:5173

## 📡 API Endpoints
### 🔹 Create a Short URL
### POST `/shorten`
```
{
  "url": "https://roadmap.sh/projects/url-shortening-service"
}
```
### Response
```
{
    "url": "https://roadmap.sh/projects/url-shortening-service",
    "shortcode": "7c876c",
    "createdAt": "Mon Mar 17 2025 19:39:20 GMT+0300 (East Africa Time)",
    "updatedAt": "Mon Mar 17 2025 19:39:20 GMT+0300 (East Africa Time)",
    "shortUrl": "https://www.bit.ly/7c876c",
    "_id": "67d85038cdda3382c3ebab09",
    "__v": 0
}
```
### 🔹 Retrieve Shortened URL Info
### GET `/shorten/:shortcode/stats`
### Response:
```
{
  "id": "1",
  "url": "https://roadmap.sh/projects/url-shortening-service",
  "shortCode": "abc123",
  "createdAt": "2021-09-01T12:00:00Z",
  "updatedAt": "2021-09-01T12:00:00Z"
}
```
### 🔹 Update Short URL
### PUT `/shorten/:shortcode`
### Response:
```
{
  "url": "https://roadmap.sh/projects/url-shortening-service/updated"
}
```
### 🔹  Delete Short URL
### DELETE `/shorten/:shortcode`
### Response:
```
{
  "message": "Short URL deleted successfully"
}
```
