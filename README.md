# JobSphere

## Overview
JobSphere is a modern professional job portal application that connects employers with prospective employees seamlessly.

## Features
- Employers can create job posts with skill requirements via an interactive dashboard.
- Employees can search and filter job posts seamlessly.
- Responsive and professional UI built with Material UI.

## Technology Stack
- **Backend:** Java 11, Spring Boot 2.5.7, MongoDB
- **Frontend:** React, Material UI (MUI)

## Project Structure
```text
D:\Java Full Stack\JobSphere
│
├── Backend
│   └── Spring Boot + MongoDB application
│
└── Frontend
    └── Frontend UI application
```

## Prerequisites
- Java 11
- Maven
- Node.js & npm
- MongoDB Atlas (or local MongoDB)

## MongoDB Setup
1. The backend connects to MongoDB via the `MONGODB_URI` environment variable.
2. Set the environment variable before running the backend. For example:
   ```powershell
   $env:MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.l2efmn4.mongodb.net/?appName=Cluster0"
   ```
3. The Database name is `JobListing`.
4. Collection name for jobs is `Post`.

## Backend Setup
1. Navigate to the backend directory:
   `cd "D:\Java Full Stack\JobSphere\Backend"`
2. Make sure `JAVA_HOME` is set to JDK 11.
3. Start the Spring Boot backend:
   `.\mvnw.cmd spring-boot:run`
4. The server runs on `http://localhost:8080/`.

## Frontend Setup
1. Navigate to the frontend directory:
   `cd "D:\Java Full Stack\JobSphere\Frontend"`
2. Install dependencies:
   `npm install`
3. Start the React development server:
   `npm start`
4. Access the UI at `http://localhost:3000/`.

## API Documentation
- `GET /allPosts` - Get all job posts.
- `GET /posts/{text}` - Search for a job post by text.
- `POST /post` - Create a new job post.

## Frontend-Backend Connection
The React frontend leverages Axios to send API requests to `http://localhost:8080/`. Make sure both apps are running concurrently.
