# JobSphere
> A fully-featured, modern job portal application allowing employers to post job listings and candidates to discover top-tier tech jobs.

JobSphere is built with **Spring Boot 3**, **React**, and **MongoDB**. The platform features dynamic search capabilities, filtering, a professional material UI, and a dedicated **Demo Mode** for easy deployment without a backend.

---

## 🚀 Features

- **Dynamic Job Feed**: Browse all active job postings with beautiful Material UI cards.
- **Smart Search & Filters**: Search across multiple fields (title, technologies, company, description) using robust MongoDB Regex aggregations, and filter by Job Type or Location.
- **Employer Dashboard**: Post new jobs with rich details, requirements, and required technologies.
- **Full CRUD Capabilities**: Edit existing jobs or securely delete them.
- **Demo Mode**: Deploy the frontend anywhere (like Vercel) even without the Spring Boot backend using a built-in dummy data fallback mode.
- **Fully Responsive**: Optimized UI for mobile, tablet, and desktop devices.

---

## 🛠️ Technology Stack

- **Frontend**: React (v18), Material UI (MUI), Axios, React Router Dom
- **Backend**: Java 17 / Spring Boot 3
- **Database**: MongoDB (Atlas)
- **Build Tools**: Maven, npm

---

## 🏗️ Architecture & Project Structure

```
JobSphere/
├── Backend/                 # Spring Boot REST API
│   ├── src/main/java/.../controller/  # API Endpoints (PostController)
│   ├── src/main/java/.../model/       # MongoDB Entities (Post)
│   ├── src/main/java/.../repository/  # MongoDB & Custom Repositories
│   └── src/main/resources/            # application.properties
│
├── Frontend/                # React UI
│   ├── src/components/      # Reusable UI (Navbar, JobForm)
│   ├── src/pages/           # Views (Home, Feed, Create)
│   ├── src/services/        # API abstractions (jobService.js)
│   └── src/data/            # Fallback data (demoJobs.js)
└── README.md
```

---

## ⚙️ Local Development Setup

### 1. Database Configuration
Set up your MongoDB Atlas cluster and acquire your connection URI.
You do not need to configure Atlas Search indices for the search feature to work, as JobSphere uses native MongoDB `$match` aggregations.

### 2. Backend Setup
Set the `MONGODB_URI` environment variable before running the backend. Do not hardcode credentials in `application.properties`.

**Windows (PowerShell)**:
```powershell
$env:MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.mongodb.net/?appName=Cluster0"
cd Backend
.\mvnw.cmd spring-boot:run
```

**Mac / Linux**:
```bash
export MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.mongodb.net/?appName=Cluster0"
cd Backend
./mvnw spring-boot:run
```
The backend will run on `http://localhost:8080`.
Swagger UI available at `http://localhost:8080/swagger-ui.html`.

### 3. Frontend Setup
Open a new terminal.

```bash
cd Frontend
npm install
npm start
```

### Environment Variables (.env)
The frontend uses environment variables to configure its API connection. Copy `.env.example` to `.env`:

```env
REACT_APP_API_URL=http://localhost:8080
REACT_APP_DEMO_MODE=false
```

---

## 🌐 Deployment (Vercel) & Demo Mode

JobSphere is explicitly built to be easily deployed to Vercel as a frontend-only showcase.

### What is Demo Mode?
If you set `REACT_APP_DEMO_MODE=true` in your Vercel Environment Variables, the application will:
1. Bypass the Spring Boot backend completely.
2. Load realistic dummy data from `src/data/demoJobs.js`.
3. Allow full CRUD operations (Create, Update, Delete) locally in the browser utilizing `localStorage`.
4. Allow searching and filtering over the dummy data.

This ensures your Vercel deployment works beautifully and interactively without needing to host the Java backend 24/7!

### Vercel Deployment Steps:
1. Push this repository to GitHub.
2. Import the project in Vercel. Set the **Framework Preset** to `Create React App`.
3. Set the **Root Directory** to `Frontend`.
4. Add the following Environment Variable:
   - `REACT_APP_DEMO_MODE=true`
5. Click **Deploy**.

*(Note: The project includes a `vercel.json` file ensuring React Router DOM works correctly on Vercel).*

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/allPosts` | Fetch all job posts from MongoDB |
| `GET` | `/posts/{text}` | Search jobs by keyword (case-insensitive regex) |
| `POST` | `/post` | Create a new job post |
| `PUT` | `/post` | Update an existing job post |
| `DELETE`| `/post/{id}` | Delete a job post by its MongoDB ID |

---

## 🔒 Security
- MongoDB credentials must **never** be committed to the repository. They are strictly loaded via `${MONGODB_URI}`.
- Ensure your `.env` file is included in `.gitignore`.
