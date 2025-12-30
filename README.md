# <span style="font-size:30px;">🚀 Mini User Management System</span>

A full-stack **User Management System** built with secure authentication, role-based authorization (Admin/User), and user account lifecycle management. This project includes backend API development, frontend UI, CRUD operations, RBAC, and deployment.

🔗 **GitHub Repository:** https://github.com/akshitahuja2022/User_Management

---

## <span style="font-size:22px;">📌 Project Overview</span>

This system includes:
- 🧍 User Signup, Login, Profile Update, Password Change  
- 👑 Admin Access: View Users, Activate/Deactivate Accounts  
- 🔐 JWT Authentication with Protected Routes  
- 🔒 RBAC → Admin & User Dashboard Access Control  

---

## <span style="font-size:22px;">🎯 Purpose</span>

Developed as part of a **48-hour technical assessment** to evaluate:
- Backend & Frontend development skills  
- API security, validation & RBAC implementation  
- Authentication using JWT & bcrypt  
- Cloud deployment & environment management  

---

## <span style="font-size:22px;">🛠 1️⃣ Tech Stack Used</span>

| Component | Technology |
|----------|-------------|
| Frontend | React (Hooks, Axios, Protected Routes) |
| Backend | Node.js + Express |
| Database | MongoDB Atlas (Cloud Database) |
| Authentication | JWT (Access Token) |
| Password Hashing | bcrypt |
| Deployment | Backend → Render • Frontend → Vercel |

---

## <span style="font-size:22px;">⚙️ 2️⃣ Setup Instructions</span>

### **📌 Backend Setup**
```bash
cd backend
npm init -y
npm install
npm start
```
📌 Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
🔐  Environment Variables (No Actual Values)
📁 Backend .env
```bash
PORT=4000
MONGO_URI=
JWT_SECRET=
NODE_ENV=
FRONTEND_URL=
```
🔐  Environment Variables (No Actual Values) 🌐 Frontend .env
```bash
VITE_BACKEND_URL=
```
---

## 📡  API Documentation

### 🧍 **Authentication Endpoints**
| Method | Endpoint | Description |
|--------|----------|--------------|
| **POST** | `/api/auth/signup` | Create new account |
| **POST** | `/api/auth/login` | Login & receive JWT |
| **POST** | `/api/auth/logout` | Logout user |
| **GET**  | `/api/auth/authenticate` | Get current logged-in user details |

---

### 👑 **Admin Endpoints (Admin Only)**
| Method | Endpoint | Description |
|--------|----------|--------------|
| **GET** | `/api/admin/users` | View all users (with pagination) |
| **PUT** | `/api/admin/users/:id/status` | Activate / Deactivate user account |

---

### 👤 **User Endpoints (Authenticated Users)**
| Method | Endpoint | Description |
|--------|----------|--------------|
| **GET** | `/api/user/profile` | View logged-in user profile |
| **PUT** | `/api/user/update` | Update name & email |
| **PUT** | `/api/user/change-password` | Change password |

---


📦 Postman Collection:
https://akshitahuja.postman.co/workspace/Team-Workspace~3e2b0578-c471-4f8a-8e9e-a995b3f32b9b/collection/45115762-7c38cd4a-b1cf-4dd7-8d66-de1064a27f97?action=share&source=copy-link&creator=45115762

---

## Folder Structure
```bash
User_Management/
├── backend/
│   ├── controllers/        # All controller logic for APIs
│   ├── middleware/         # Authentication, validation, role checks
│   ├── models/             # Mongoose models (User schema, etc.)
│   ├── routes/             # API endpoint routing files
│   └── server.js           # Entry point for backend server
|
├── frontend/
│   ├── src/                # Main source folder
│   ├── components/         # Reusable UI components
│   └── pages/              # Frontend pages (Login, Signup, Dashboard, etc.)
│
└── README.md               # Project documentation

```
---

<span style="font-size:22px;">👨‍💻 Developed By</span>

Akshit Ahuja
🎓 B.Tech CSE | Engineering College Bikaner

🔗 LinkedIn: https://www.linkedin.com/in/akshit-ahuja-1583b928a/

🔗 GitHub: https://github.com/akshitahuja2022
