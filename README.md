# JobSphere - Modern Job Portal

JobSphere is a professional full-stack job portal application that bridges the gap between employers and top talent. Built with Spring Boot for a robust backend and React (Material UI) for a highly responsive frontend, this platform offers a seamless experience for posting, searching, and managing job listings.

---

## 🎯 Features

- **For Employers:** Easily create job listings specifying requirements, required experience, technologies, and salary.
- **For Candidates:** Browse through all available job postings in a modern card-based interface.
- **Advanced Search:** Robust MongoDB text search aggregates jobs matching specific profiles or technologies instantly.
- **Responsive UI:** Fully fluid Material UI components that adapt to mobile, tablet, and desktop screens.

---

## 🏗️ Architecture & Technology Stack

### Backend
- **Java 11**
- **Spring Boot 2.5.7** (REST APIs)
- **Spring Data MongoDB** (Database Integration)
- **Maven** (Build Tool)
- **Swagger / Springfox** (API Documentation)

### Frontend
- **React 18** (User Interface)
- **Material UI (MUI)** (Component Library)
- **Axios** (HTTP Client)
- **React Router** (Navigation)

### Database
- **MongoDB Atlas** (Cloud NoSQL Database)

---

## 📂 Project Structure

```text
JobSphere/
│
├── Backend/                 # Spring Boot API
│   ├── src/main/java/com/jobsphere/joblisting/
│   │   ├── controller/      # REST API Endpoints
│   │   ├── model/           # MongoDB Entities
│   │   └── repository/      # Database Operations
│   └── pom.xml              # Maven dependencies
│
└── Frontend/                # React UI
    ├── src/
    │   ├── pages/           # React Components (Feed, Create, Dashboard)
    │   └── App.js           # Routing Configuration
    └── package.json         # Node dependencies
```

---

## 🚀 Getting Started

### Prerequisites
Before you begin, ensure you have the following installed on your machine:
- **Java Development Kit (JDK) 11** (Ensure `JAVA_HOME` is set)
- **Node.js** (v14 or higher) & **npm**
- **Maven** (optional, uses the included wrapper)
- **MongoDB** (A cloud Atlas cluster or a local instance)

---

### 1. MongoDB Setup & Environment Variables

JobSphere requires a MongoDB connection. The application is configured to read the connection string from an environment variable for security.

1. Set up a cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a database named `JobListing` and a collection named `JobPost`.
3. Set your environment variable:

**Windows (PowerShell):**
```powershell
$env:MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.your-cluster.mongodb.net/?appName=Cluster0"
```
**Linux/Mac (Bash):**
```bash
export MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.your-cluster.mongodb.net/?appName=Cluster0"
```
> **⚠️ Security Warning:** Never commit your actual database password to GitHub or share it publicly!

---

### 2. Backend Installation & Run

1. Open a terminal and navigate to the Backend folder:
   ```powershell
   cd "D:\Java Full Stack\JobSphere\Backend"
   ```
2. Run the Spring Boot application using Maven:
   ```powershell
   .\mvnw.cmd spring-boot:run
   ```
3. The server will start on `http://localhost:8080/`.

---

### 3. Frontend Installation & Run

1. Open a *new* terminal window and navigate to the Frontend folder:
   ```powershell
   cd "D:\Java Full Stack\JobSphere\Frontend"
   ```
2. Install the required Node dependencies:
   ```powershell
   npm install
   ```
3. Start the React development server:
   ```powershell
   npm start
   ```
4. The application will open in your browser at `http://localhost:3000/`.

---

## 📡 API Documentation

You can view the interactive Swagger API documentation at:
**`http://localhost:8080/swagger-ui.html`**

### Available Endpoints:
- **`GET /allPosts`** - Fetch all job listings.
- **`GET /posts/{text}`** - Search for jobs containing a specific keyword or technology.
- **`POST /post`** - Create a new job listing.

---

## 💾 MongoDB Data Structure

The application maps to the `JobPost` collection in MongoDB. The documents should follow this schema:

```json
{
  "title": "Java Full Stack Developer",
  "description": "Software engineer with experience in Java, Spring Boot and modern frontend technologies",
  "experience": 2,
  "profile": "java full stack developer",
  "technologies": [
    "java",
    "spring",
    "springboot",
    "react",
    "mysql"
  ],
  "location": "Hyderabad",
  "jobType": "Full Time",
  "salary": "6-10 LPA",
  "company": "Tech Solutions Pvt Ltd"
}
```

---

## 🛠️ Troubleshooting & Common Errors

1. **`Port 8080 is already in use`**
   - *Fix:* Another application is running on port 8080. Find and stop the process, or run Spring Boot on a different port.

2. **`JAVA_HOME not found in your environment`**
   - *Fix:* Ensure JDK 11 is installed and the `JAVA_HOME` environment variable points to its installation path (e.g., `C:\Program Files\Java\jdk-11`).

3. **Blank Screen on Frontend / React Errors**
   - *Fix:* Ensure your backend is running. If the backend schema does not match the frontend React mappings (e.g., `title`, `description`), the UI will fail to render the arrays.

4. **MongoDB Connection Fails**
   - *Fix:* Verify your `$env:MONGODB_URI` is correctly exported in the terminal where you are running the backend. Ensure your MongoDB Atlas Network Access (IP Whitelist) allows your current IP address (or set it to `0.0.0.0/0` for testing).
