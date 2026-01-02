import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className=" flex flex-col items-center my-[5rem] m-auto p-1">
      <h3 className="text-xl sm:text-[1.7rem] md:text-4xl [px-2] text-center mb-3 font-bold">
        Welcome te Task<span className="text-blue-900">Management</span>
      </h3>
      <p className="text-center text-md sm:text-lg w-full sm:w-[85%] md:w-[55%]">
        A modern User Task Management System that enables secure user
        authentication and role-based access control (RBAC). The system is built
        with secure APIs, protected authentication flows, and clearly defined
        user roles to ensure that only authorized users can access sensitive
        features.
      </p>

      <Link
        to="/signup"
        className="text-lg mt-5 bg-gray-400 text-black font-bold px-3 py-1 rounded-md hover:bg-gray-500"
      >
        Get Started
      </Link>
    </div>
  );
}

export default Hero;
