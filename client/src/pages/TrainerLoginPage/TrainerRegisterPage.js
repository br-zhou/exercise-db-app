import React, { useState, useEffect } from "react";
import RegisterCard from "../../components/RegisterCard/RegisterCard";
import { serverPost } from "../../utils/api";
import { useNavigate } from "react-router-dom";
const TrainerRegisterPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("token", token);
      navigate("/");
    } 
  }, []);
  
  const handleSubmit = async (event) => {
    const result = await serverPost('POST', 'register',event);
    if (result.status) {
      await serverPost('POST', 'login-auth', event);
      localStorage.setItem("token", result);
      navigate("/");
    }
    else {
      console.log("An error occured.");
    }
  }

  return (
    <div>
      <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        TRAINER REGISTER
      </h1>
      <RegisterCard registerHref="/trainer-login" handleSubmit={handleSubmit} />
    </div>
  );
};

export default TrainerRegisterPage;
