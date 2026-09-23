<div align="center">

# 💼 JobSphere — Modern Full-Stack Job Portal

<p align="center">
  A premium, high-performance recruitment platform connecting top talent with cutting-edge tech companies. Built with the latest 2026 stable technologies.
</p>

</div>

---

## 📌 Project Overview

JobSphere is a comprehensive full-stack application built to facilitate the modern job search. It provides a robust platform where **Employers** can seamlessly post and manage job opportunities, and **Employees** can browse, search, and apply for roles tailored to their exact skill set.

This project was built as a full-stack learning platform showcasing a heavily modernized tech stack, clean architecture, and enterprise-grade design patterns. It features a complete Spring Boot REST API backed by MongoDB Atlas, paired with a blazing-fast React/Vite frontend styled with Tailwind CSS v4.

---

## ✨ Why JobSphere?

- **Bleeding Edge Yet Stable:** Upgraded to React 19, Vite 8, and Spring Boot 3.4 for maximum modern performance and stability.
- **Lightning-Fast UI:** Utilizes Vite 8 for near-instant cold starts and Hot Module Replacement (HMR).
- **Premium SaaS Design:** Fully custom, responsive, and dynamic UI built with Tailwind CSS v4 and Lucide React.
- **Smart Search:** Deep, multi-field case-insensitive regex search directly in MongoDB.
- **Serverless Ready:** Features a dedicated "Demo Mode" allowing the frontend to be deployed independently to Vercel without requiring a 24/7 backend server.

---

## 🏗️ Architecture

JobSphere utilizes a decoupled client-server architecture communicating via RESTful JSON APIs.

### Production Mode Flow
```text
React (Vite)  →  Axios  →  Spring Boot REST API  →  Spring Data  →  MongoDB Atlas
```

### Demo Mode Flow (Vercel)
```text
React (Vite)  →  Service Layer  →  LocalStorage (Fallback Data)
```

---

## 🛠️ Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | `^19.0.0` | Component-based frontend UI rendering (latest concurrent features) |
| **Vite** | `^6.0.7` | Ultra-fast frontend build tool and dev server |
| **Tailwind CSS** | `^4.0.0` | Utility-first styling architecture |
| **Lucide React** | `^1.47.0` | Crisp SVG iconography |
| **React Router** | `^7.1.1` | Modern Client-side Single Page Application (SPA) routing |
| **Axios** | `^1.6.8` | HTTP client for API communication |
| **Java** | `17 LTS` | Core backend programming language |
| **Spring Boot** | `3.4.1` | Robust REST API framework (Jakarta EE 10) |
| **MongoDB** | Atlas | NoSQL document database storage |
| **Springdoc** | `2.3.0` | Modern OpenAPI 3 / Swagger documentation |

*Note: The project was explicitly modernized to remove outdated technologies such as Create React App (Webpack), Material UI, Spring Boot 2, and Springfox Swagger2.*

---

## 🗂️ Project Structure

The repository is logically divided into two independent workspaces:

```text
JobSphere/
│
├── Backend/
│   ├── src/main/java/com/jobsphere/joblisting/
│   │   ├── controller/      # API Endpoints (PostController)
│   │   ├── model/           # MongoDB Entities (Post)
│   │   ├── repository/      # MongoRepository & Aggregations
│   │   └── JoblistingApplication.java
│   ├── src/main/resources/
│   │   └── application.properties # Server port & configurations
│   ├── pom.xml              # Maven dependencies & versions
│   └── mvnw.cmd             # Maven Wrapper
│
├── Frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI (Navbar, JobForm, JobCard)
│   │   ├── pages/           # Route views (Home, Feed, Create, JobDetails)
│   │   ├── services/        # jobService.js (API abstractions & Demo mode)
│   │   ├── data/            # demoJobs.js (Fallback dataset)
│   │   ├── App.jsx          # React Router configuration
│   │   ├── index.css        # Tailwind v4 base layer
│   │   └── main.jsx         # Vite entry point
│   ├── package.json         # Node dependencies
│   ├── vite.config.js       # Vite + Tailwind v4 integration
│   ├── .env.example         # Template for environment variables
│   └── index.html           # DOM root
│
└── README.md
```

---

## 🗃️ Database Documentation

JobSphere utilizes MongoDB for flexible document storage.

**Database Name:** `JobListing`  
**Collection Name:** `JobPost`

### Document Structure (`Post.java`)

```json
{
  "id": "64f1a2b3c4d5e6f7a8b9c0d1",
  "title": "Senior Java Developer",
  "description": "Looking for an experienced backend engineer...",
  "experience": 5,
  "profile": "Backend Engineer",
  "technologies": [
    "Java",
    "Spring Boot",
    "MongoDB",
    "Kafka"
  ],
  "location": "Remote",
  "jobType": "Full Time",
  "salary": "15-20 LPA",
  "company": "Tech Innovators Inc."
}
```

### Search Implementation
The backend implements a highly efficient regex-based search `SearchRepositoryImpl.java`. When a user searches, MongoDB performs a case-insensitive `$regex` `$match` via an `$or` operator across the following fields:
`title`, `description`, `profile`, `technologies`, `company`, and `location`.

---

## 🌐 API Documentation

The REST API strictly adheres to standard HTTP methods.

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/allPosts` | Fetch all job posts from the database |
| `GET` | `/posts/{text}` | Search jobs by a keyword string (case-insensitive) |
| `GET` | `/raw` | Fetch raw `org.bson.Document` entries |
| `POST` | `/post` | Create a new job post |
| `PUT` | `/post` | Update an existing job post |
| `DELETE` | `/post/{id}` | Delete a job post by its MongoDB `_id` |

### Swagger / OpenAPI
Because JobSphere uses **Spring Boot 3.4**, the API is documented using **Springdoc OpenAPI**.
Once the backend is running, you can explore and test the endpoints directly from the browser:

👉 **URL:** `http://localhost:8080/swagger-ui/index.html`

---

## 💻 Frontend Routes

The frontend is a Single Page Application managed by React Router 7.

| Route | Page Component | Purpose |
|-------|----------------|---------|
| `/` | `Home.jsx` | Marketing landing page and hero section |
| `/employee/feed` | `Feed.jsx` | Browse all jobs, search, and filter |
| `/jobs/:id` | `JobDetails.jsx` | Dedicated page for full job requirements |
| `/employer/dashboard` | `Create.jsx` | Multi-step form to post a new job |

---

## 🚀 Installation & Setup

### Prerequisites
- **Git**
- **Java 17**
- **Maven** (Optional, Wrapper included)
- **Node.js** (v18+)
- **MongoDB Atlas** account (or local MongoDB)

Clone the repository:
```bash
git clone https://github.com/Mohammad-Asfin/JobSphere.git
cd JobSphere
```

### 1. Backend Setup

Open a terminal (PowerShell example) and navigate to the backend:
```powershell
cd "Backend"
```

Configure your MongoDB URI as an environment variable so credentials are never hardcoded in the source code:
```powershell
$env:MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
```

Compile and run the Spring Boot application:
```powershell
.\mvnw.cmd clean package
.\mvnw.cmd spring-boot:run
```
*The API will start on `http://localhost:8080`.*

### 2. Frontend Setup

Open a new terminal and navigate to the frontend:
```bash
cd "Frontend"
```

Install dependencies and start the Vite development server:
```bash
npm install
npm run dev
```
*The frontend will start on `http://localhost:5173`.*

---

## ⚙️ Environment Variables

The frontend relies on Vite environment variables. Create a `.env` file in the `Frontend/` directory based on `.env.example`:

| Variable | Required | Purpose | Example |
|----------|----------|---------|---------|
| `VITE_API_URL` | Yes | Points Axios to the Spring Boot Backend | `http://localhost:8080` |
| `VITE_DEMO_MODE` | Yes | Bypasses the backend for serverless deployment | `false` |

---

## 🎭 Demo Mode & Vercel Deployment

**Demo Mode** is a unique feature engineered into the frontend `jobService.js`. 
Because hosting Java Spring Boot backends 24/7 can be expensive, setting `VITE_DEMO_MODE=true` intercepts all Axios HTTP calls and instead routes them to browser `LocalStorage`.

- **On first load:** It seeds the browser with ~20 realistic fictional jobs.
- **Operations:** Create, Read, Update, Delete, and Regex Searching all function perfectly in memory.
- **Use Case:** Perfect for deploying to Vercel for portfolio demonstrations without needing a live backend.

### Deploying to Vercel
1. Push your code to GitHub.
2. Create a new project in Vercel and import the repository.
3. Set the **Root Directory** to `Frontend`.
4. Ensure the Framework Preset is detected as **Vite**.
5. Add the Environment Variable: `VITE_DEMO_MODE` = `true`.
6. Deploy!

*(React Router SPA behavior is automatically handled on Vercel).*

---

## 🎓 Learning Concepts

This project demonstrates several key full-stack concepts:

### Full Stack Data Flow
```text
User clicks "Publish Job"
  ↓
React collects state from `JobForm.jsx`
  ↓
Axios executes `POST /post` payload
  ↓
Spring Boot `PostController.java` receives request
  ↓
Spring Data `PostRepository.save()` executes
  ↓
MongoDB securely persists the Document
```

### CRUD Operations
- **CREATE:** Handled by `@PostMapping` mapped to `repo.save()`.
- **READ:** Handled by `@GetMapping` mapped to `repo.findAll()`.
- **UPDATE:** Handled by `@PutMapping`. In Spring Data MongoDB, calling `save()` on an entity with an existing ID acts as an Upsert (Update).
- **DELETE:** Handled by `@DeleteMapping` mapped to `repo.deleteById()`.

---

## 🐛 Troubleshooting

### Backend doesn't start
- **Check Java Version:** Ensure `java -version` returns 17. Ensure `JAVA_HOME` is set.
- **Port 8080 in use:** Another process is running. Terminate it, or change `server.port=8081` in `application.properties`.

### MongoDB connection failed
- **Check Atlas Network Access:** Your current IP address must be added to the MongoDB Atlas Network whitelist (or set to `0.0.0.0/0` for testing).
- **Check Credentials:** Ensure `$env:MONGODB_URI` contains the correct database user password (not your Atlas login password).

### Frontend cannot connect to backend (Network Error)
- **CORS:** The backend `PostController` is configured with `@CrossOrigin(origins = "http://localhost:3000")`. If Vite is running on `5173`, you must update the CORS annotation in Java.
- **Environment:** Ensure `VITE_API_URL` is set correctly and the backend is actually running.

### Vercel refresh gives 404
- Single Page Applications require all routes to fallback to `index.html`. This is generally handled automatically by Vite plugins on Vercel, but ensure a `vercel.json` rewrite rule is added if issues persist.

---

## 🔒 Security Notes
- **Never commit credentials:** `.env` is ignored via `.gitignore`. The MongoDB URI is strictly passed via environment variables.
- **Rotation:** If MongoDB credentials were ever accidentally pushed to GitHub in the past, rotate the password immediately via the Atlas Dashboard.

---

## 👤 Author

**Mohammad Asfin**
- GitHub: [https://github.com/Mohammad-Asfin](https://github.com/Mohammad-Asfin)
- Repository: [https://github.com/Mohammad-Asfin/JobSphere](https://github.com/Mohammad-Asfin/JobSphere)
