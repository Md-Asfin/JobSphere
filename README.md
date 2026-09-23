# JobSphere

## Overview
JobSphere is a professional job portal application that connects employers with prospective employees.

## Features
- Employers can create job posts with skill requirements.
- Employees can search and filter job posts.

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
1. The backend uses MongoDB Atlas. Ensure the `application.properties` string in `Backend/src/main/resources` is correct.
2. The Database name is `JobListing`.
3. Collection name for jobs: `Post`.

## Backend Setup
1. Navigate to the backend directory:
   `cd "D:\Java Full Stack\JobSphere\Backend"`
2. Make sure `JAVA_HOME` is set to JDK 11.
3. Run the backend:
   `.\mvnw.cmd spring-boot:run`

## Frontend Setup
1. Navigate to the frontend directory:
   `cd "D:\Java Full Stack\JobSphere\Frontend"`
2. Install dependencies:
   `npm install`
3. Start the React server:
   `npm start`

## API Documentation
- `GET /allPosts` - Get all job posts.
- `GET /posts/{text}` - Search for a job post.
- `POST /post` - Create a new job post.

## Frontend-Backend Connection
The React frontend uses Axios to send requests to `http://localhost:8080/`. Ensure the Spring Boot application is running on port 8080.
