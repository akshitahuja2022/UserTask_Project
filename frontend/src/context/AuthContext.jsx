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

  return (
    <AuthContext.Provider
      value={{ formData, setFormData, isLogin, setIsLogin, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
