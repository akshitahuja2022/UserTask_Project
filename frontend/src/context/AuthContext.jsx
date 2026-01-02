import { useState } from "react";
import { AuthContext } from "./AuthContext";

const AuthContextProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    currentPassword: "",
    newPassword: "",
  });

  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
  });
  const [tasks, setTasks] = useState([]);
  return (
    <AuthContext.Provider
      value={{
        formData,
        setFormData,
        isLogin,
        setIsLogin,
        user,
        setUser,
        users,
        setUsers,
        page,
        setPage,
        loading,
        setLoading,
        taskForm,
        setTaskForm,
        tasks,
        setTasks,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
