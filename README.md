# 🚦 Deadline Risk Radar

## Project Overview

Deadline Risk Radar is a full-stack task management application that helps users track tasks and intelligently understand the **risk of missing deadlines**.

Unlike traditional to-do apps, this project dynamically evaluates whether a task is **Safe**, **At Risk**, or **Likely Late** based on real-world factors such as:
- Due date
- Estimated effort
- Task priority
- Current server time

The risk status is **not stored** in the database. Instead, it is **calculated dynamically on every request**, ensuring accurate and up-to-date results as time passes.

---

## Features Implemented

### 🔐 Authentication
- User registration and login
- JWT-based authentication
- Secure password hashing using bcrypt
- Protected routes for authenticated users

### 📝 Task Management
- Create, update, and delete tasks
- Task fields:
  - Title
  - Due date
  - Estimated hours
  - Priority (Low / Medium / High)

### 🚦 Smart Risk Evaluation
Each task is categorized into one of the following:

- 🟢 **Safe** – Enough buffer time is available
- 🟡 **At Risk** – Task can be completed but requires focus
- 🔴 **Likely Late** – Deadline is likely to be missed

Risk calculation considers:
- Remaining time until **end of due date**
- Estimated work hours with buffer
- Priority sensitivity
- Maximum realistic work hours per day

### 🔄 Dynamic Updates
- Risk level updates automatically as time passes
- Dashboard periodically refreshes tasks
- No manual refresh required to see updated risk

### 🎨 UI / UX
- Clean and modern dashboard layout
- Modal-based task creation
- Visual risk badges
- Filter tasks by risk level

---

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- JWT (JSON Web Tokens)

### Deployment
- Frontend: Render
- Backend: Render
- Database: MongoDB Atlas

---

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB Atlas account
- Git

---

### Step 1: Clone the Repository

```bash
git clone https://github.com/riyalchandrakar/Deadline-Risk-Radar.git
cd Deadline-Risk-Radar
```

### Step 2: Backend Setup

```bash
cd backend
npm install

```
Create a .env file in the backend directory:

```bash
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:5173
```

Start the backend server:

```bash
npm start
```

### Step 3: Frontend Setup

```bash
cd frontend
npm install
```

Create a .env file in the frontend directory:

```bash
VITE_API_URL=http://localhost:5000/api
```

Start the frontend application:


```bash
npm run dev
```
