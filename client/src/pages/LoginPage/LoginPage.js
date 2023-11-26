import { useState, setState, useEffect } from "react";
import LoginCard from "../../components/LoginCard/LoginCard";
import { serverPost } from "../../utils/api";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("token", token);
      navigate("/");
    } 
  }, []);

  const handleSubmit = async (event) => {
    const result = await serverPost('POST', 'login-auth',event);
    console.log(result);
    if (result) {
      localStorage.setItem("token", result);
      navigate("/");
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Login
      </h1>
      <LoginCard handleSubmit={handleSubmit} registerHref="/register" />
    </div>
  );
};

export default LoginPage;
