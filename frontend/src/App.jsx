import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import UserAccount from "./pages/UserAccount";
import { ToastContainer } from "react-toastify";
import { useAuthContext } from "./context/AuthContext";
import AdminDashboard from "./pages/AdminDashboard";
import EditTask from "./pages/EditTask";

const App = () => {
  const { isLogin } = useAuthContext();

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/edit-task/:id" element={<EditTask />} />

        {/* Protected Profile Route */}
        <Route
          path="/profile"
          element={isLogin ? <UserAccount /> : <Navigate to="/login" />}
        />

        {/* Auth Routes */}
        <Route
          path="/login"
          element={isLogin ? <Navigate to="/profile" /> : <Login />}
        />

        <Route
          path="/signup"
          element={isLogin ? <Navigate to="/profile" /> : <Signup />}
        />

        <Route
          path="/admin-dashboard"
          element={isLogin ? <AdminDashboard /> : <Navigate to="/login" />}
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <ToastContainer />
    </>
  );
};

export default App;
