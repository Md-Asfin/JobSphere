# 💼 JobSphere
### Modern Full-Stack Job Portal

> A modern job discovery and job posting platform built with React, Vite, Tailwind CSS, Spring Boot and MongoDB.

**Author:** Mohammad Asfin  
**Version:** 2.0.0  
**Status:** Active Development  

---

## 🚀 Quick Start
- [Key Features](#-key-features)
- [Architecture](#-architecture)
- [Tech Stack](#️-tech-stack)
- [API Documentation](#-api-documentation)
- [Deployment (Demo Mode)](#-demo-mode)

---

## 📌 Project Overview
JobSphere is a comprehensive full-stack recruitment platform. It connects talented developers with cutting-edge tech companies. 
- **Employers** can seamlessly post, update, and manage job listings with required technologies.
- **Employees** can browse, search dynamically, and filter opportunities based on their skill sets.
- Built utilizing a highly resilient dual-mode architecture: run it full-stack with Java, or deploy a serverless-friendly frontend using the interactive Demo Mode.

---

## ✨ Key Features

### 👨‍💼 Employer
- **Create jobs** via a professional multi-step React form.
- **Update jobs** with pre-filled inputs.
- **Delete jobs** securely.
- **Manage technologies** using dynamic auto-complete chips.

### 👨‍💻 Employee
- **Browse jobs** via premium Tailwind CSS cards.
- **Smart Search** natively across multiple MongoDB fields.
- **Filter** by Location and Job Type.
- **View details** on dedicated job requirement pages.

### 🛠️ Platform
- **REST API** fully documented with Springdoc/OpenAPI.
- **Demo mode** enabling Vercel deployment without the Spring Boot backend.
- **Responsive UI** tailored for mobile, tablet, and desktop screens.

---

## 🧩 Architecture

The application communicates efficiently via REST JSON payloads.

**Production Mode:**
```text
React (Vite) → Tailwind CSS → REST API → Spring Boot 3 → MongoDB
```

**Vercel Demo Mode:**
```text
React (Vite) → Tailwind CSS → Demo Data / localStorage
```

---

## 🗂️ Project Structure

```text
JobSphere/
├── Backend/                 
│   ├── src/main/java/.../controller/  # API mappings (PostController)
│   ├── src/main/java/.../model/       # MongoDB Entities (Post)
│   ├── src/main/java/.../repository/  # MongoDB aggregate pipelines
│   └── pom.xml                        # Maven dependencies
│
├── Frontend/                
│   ├── src/components/      # Reusable UI (Navbar, JobForm)
│   ├── src/pages/           # Views (Home, Feed, Create, JobDetails)
│   ├── src/services/        # jobService.js (API abstractions)
│   ├── src/data/            # demoJobs.js (Fallback data)
│   ├── package.json         # Vite + React configs
│   └── tailwind.config.js   # Tailwind v4 configuration
└── README.md
```

---

## 🗃️ MongoDB Data Model
**Database:** `JobListing`  
**Collection:** `JobPost`  

| Field | Type | Description |
|---|---|---|
| id | String | Job unique identifier (MongoDB _id) |
| title | String | Job title |
| description | String | Comprehensive job description |
| experience | Integer | Minimum years of experience |
| profile | String | General role classification |
| technologies | Array | List of required technical skills |
| location | String | Job geographical location |
| jobType | String | Employment type (e.g. Full Time, Remote) |
| salary | String | Salary range representation |
| company | String | Issuing company name |

---

## 🔍 Search Architecture
JobSphere executes lightning-fast, case-insensitive searches natively via MongoDB `$match` and `$or` regex aggregations on `SearchRepositoryImpl.java`.

It actively scans: `title`, `description`, `profile`, `technologies`, `company`, and `location`.
- If the backend is offline, **Demo Mode** seamlessly takes over using native JavaScript `.filter()`.

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **React** | 18.2 | Component-based UI rendering |
| **Vite** | 5.2 | Ultra-fast frontend build tooling |
| **Tailwind CSS** | 4.0 | Utility-first styling architecture |
| **Lucide React** | 0.363 | Crisp SVG iconography |
| **Java** | 17 | Core backend language |
| **Spring Boot** | 3.2.3 | REST API framework |
| **Springdoc** | 2.3.0 | Modern Swagger/OpenAPI UI |
| **MongoDB** | Atlas | NoSQL document storage |

---

## 📥 Installation

```bash
git clone https://github.com/Mohammad-Asfin/JobSphere.git
cd JobSphere
```

---

## 🖥️ Backend Setup
1. Define your MongoDB connection in your shell environment.
2. Ensure you have Java 17 and Maven installed.

**Windows PowerShell:**
```powershell
$env:MONGODB_URI="mongodb+srv://<user>:<pass>@cluster0.mongodb.net/?appName=Cluster0"
cd Backend
.\mvnw.cmd spring-boot:run
```
**Access API Documentation:** `http://localhost:8080/swagger-ui/index.html`

---

## 🎨 Frontend Setup
```bash
cd Frontend
npm install
npm run dev
```

---

## 🔐 Environment Variables
Frontend variables are injected via `.env`. A `.env.example` is provided.

```env
VITE_API_URL=http://localhost:8080
VITE_DEMO_MODE=false
```
*Note: We never expose MongoDB credentials directly to the browser.*

---

## 🌐 API Documentation

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/allPosts` | Fetch all job posts from MongoDB |
| `GET` | `/posts/{text}` | Search jobs by keyword |
| `POST` | `/post` | Create a new job post |
| `PUT` | `/post` | Update an existing job post |
| `DELETE`| `/post/{id}` | Delete a job post by its MongoDB ID |

---

## 🎭 Demo Mode & Vercel Deployment

JobSphere is pre-configured to deploy easily to Vercel. 
To showcase the application without paying for 24/7 backend hosting, enable **Demo Mode**.

### Enabling Demo Mode
Set `VITE_DEMO_MODE=true` in your Vercel project settings. 
The application will safely route all CRUD requests to browser `localStorage` and initialize 20 realistic fake jobs representing Indian tech hubs.

### Vercel Steps:
1. Push to GitHub and import to Vercel.
2. Root Directory: `Frontend`.
3. Add Env Var: `VITE_DEMO_MODE=true`.
4. Deploy. *(The included `vercel.json` guarantees React Router DOM works flawlessly).*

---

## 🐛 Troubleshooting
- **Port 8080 already in use:** Identify the rogue process or change `server.port` in Spring Boot.
- **MongoDB Connection Failure:** Ensure your Atlas Network Access allows your current IP address.
- **CORS Error:** Verify that `@CrossOrigin` in `PostController.java` matches your frontend port (default `3000` or `5173` for Vite).
- **Blank Frontend Screen:** Check Vite environment variables; ensure they are prefixed with `VITE_`.

---

## 🔒 Security
- All sensitive MongoDB passwords are securely fetched dynamically via system environment parameters (`${MONGODB_URI}`).
- Ensure you actively rotate your Atlas credentials if they have historically been committed to source control.

---

## 📄 License
Licensed under standard repository terms. No strict license defined.
