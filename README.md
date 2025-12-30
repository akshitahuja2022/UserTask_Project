
Mini User Management System

A full-stack User Management System built with secure authentication, role-based authorization (Admin/User), and user account lifecycle management. This project includes backend API development, frontend UI, CRUD operations, RBAC, and deployment.

🔗 GitHub Repository:
https://github.com/akshitahuja2022/User_Management

📌 Project Overview

This system allows:

Users to sign up, log in, update profile, and change password

Admins to manage all users with activation/deactivation controls

JWT authentication for secure route protection

Role-Based Access Control (RBAC) for Admin & User dashboards

🎯 Purpose

This project was developed as part of a 48-hour technical assessment to evaluate:

Backend & Frontend development skills

API security, validation & RBAC implementation

Authentication flows using JWT & bcrypt

Cloud deployment & environment configuration

1️⃣ Tech Stack Used
Component	Technology
Frontend	React (Hooks, Axios, Protected Routes)
Backend	Node.js + Express
Database	MongoDB Atlas (Cloud Database)
Authentication	JWT (Access Token)
Password Hashing	bcrypt
Deployment	Backend → Render Frontend → Vercel
2️⃣ Setup Instructions
📌 Backend Setup
cd backend
npm install
npm start

📌 Frontend Setup
cd frontend
npm install
npm run dev

3️⃣ Environment Variables (No Actual Values)
Backend .env
PORT=4000
MONGO_URI=
JWT_SECRET=
NODE_ENV=
FRONTEND_URL=

Frontend .env
VITE_BACKEND_URL=


⚠️ Add .env to .gitignore to protect sensitive keys.

4️⃣ Deployment Instructions
🚀 Backend Deployment (Render)
1. Push backend to GitHub
2. Create new Web Service (Render)
3. Add .env variables
4. Build/Start Command:
   npm install
   npm start
5. Deploy & copy public API URL

🌐 Frontend Deployment (Vercel)
1. Import frontend from GitHub
2. Add environment variable
3. Deploy & test connection

🧍 Authentication Endpoints
Method	Endpoint	Description
POST	api/auth/signup	Create new account
POST	api/auth/login	Login & receive JWT
POST	api/auth/logout	Logout user
GET	api/auth/authenticate	Current user details


👑 Admin Endpoints (Admin Only)
Method	Endpoint	Description
GET	api/admin/users	View all users (pagination)
PUT	api/admin/users/:id/status

👤 User Endpoints (Authenticated Users)
Method	Endpoint	Description
GET	/user/profile	View user profile
PUT	/user/update	Update name/email
PUT	/user/change-password	Change password
📦 API Collection (Postman)

👉 Postman Collection File (Add in repo root):

https://akshitahuja.postman.co/workspace/Team-Workspace~3e2b0578-c471-4f8a-8e9e-a995b3f32b9b/collection/45115762-7c38cd4a-b1cf-4dd7-8d66-de1064a27f97?action=share&source=copy-link&creator=45115762)

📂 Folder Structure
User_Management/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/
│   ├── src/
│   ├── components/
│   └── pages/
└── README.md

🧑‍💻 Developed By

Akshit Ahuja 🎓 B.Tech CSE | Engineering College Bikaner

🔗 LinkedIn Profile - https://www.linkedin.com/in/akshit-ahuja-1583b928a/

🔗 GitHub Profile - https://github.com/akshitahuja2022
