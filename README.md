Mini User Management System

A full-stack User Management System designed for authentication, role-based authorization (Admin/User), and user account lifecycle management. This project demonstrates backend API development, frontend UI, secure authentication flows, RBAC, CRUD operations, and deployment.

🔗 GitHub Repository:
https://github.com/akshitahuja2022/User_Management

📌 Project Overview

The Mini User Management System is a web application that allows users to create accounts, log in, manage their profiles, and interact with the system based on assigned roles. Admin users have elevated privileges including activating/deactivating accounts and managing all users. Regular users can only manage their personal profile.

🎯 Purpose

This project is built as part of a 48-hour assessment to evaluate:

Backend & frontend development skills

JWT authentication & password hashing

Secure REST APIs with role-based access control

Clean architecture & deployment abilities

🛠 Tech Stack Used
Component	Technology
Frontend	React (Hooks, Axios, Protected Routes)
Backend	Node.js + Express
Database	MongoDB (Cloud via MongoDB Atlas)
Authentication	JWT Authentication
Password Security	bcrypt hashing
Deployment	Backend: Render/Railway • Frontend: Vercel/Netlify

🔐 Environment Variables (without actual values)
Backend :
PORT=4000
MONGO_URI=
JWT_SECRET=
NODE_ENV=
FRONTEND_URL=

Fronted :
VITE_BACKEND_URL=http://localhost:4000

🌍 Deployment Instructions
Backend Deployment (Render/Railway)

Push code to GitHub

Create new service on Render/Railway

Add environment variables from .env

Deploy & copy the generated backend URL

Frontend Deployment (Vercel/Netlify)

Import frontend folder from GitHub

Add the VITE_API_BASE_URL environment variable

Deploy & connect to backend URL
