import React, { useState } from "react";
import PaidUserRegister from "../../components/Register/PaidUserRegister";
import RegisterCard from "../../components/RegisterCard/RegisterCard";

const RegisterPage = () => {
  
  
  const handleSubmit = async (data) => {
    console.log(data);
  }

  return (
    <div>
      <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        REGISTER
      </h1>
      <RegisterCard registerHref="/login" handleSubmit={handleSubmit} />
    </div>
  );
};

export default RegisterPage;
