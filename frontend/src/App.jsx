import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import UserAccount from "./pages/UserAccount";
import { ToastContainer } from "react-toastify";
import { useAuthContext } from "./context/AuthContext";
import EditProfile from "./components/EditProfile";
import ChangePassword from "./components/ChangePassword";
import AdminDashboard from "./pages/AdminDashboard";

const App = () => {
  const { isLogin } = useAuthContext();

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

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

        <Route
          path="/editProfile"
          element={isLogin ? <EditProfile /> : <Navigate to="/login" />}
        />
        <Route
          path="/changePassword"
          element={isLogin ? <ChangePassword /> : <Navigate to="/login" />}
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <ToastContainer />
    </>
  );
};

export default App;
