import React from "react";
import Hero from "../components/Hero";
import AddTask from "../components/AddTask";
import TaskList from "../components/TaskList";
import { useAuthContext } from "../context/AuthContext";
import AdminDashboard from "./AdminDashboard";

const Home = () => {
  const { isLogin, user } = useAuthContext();

  if (!isLogin) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Hero />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {user?.role === "admin" ? (
        <AdminDashboard />
      ) : (
        <div className="flex flex-col lg:flex-row gap-6 items-start md:items-stretch m-4 md:m-10">
          <AddTask />
          <TaskList />
        </div>
      )}
    </div>
  );
};

export default Home;
