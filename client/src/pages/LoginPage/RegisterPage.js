import React, { useState } from "react";
import PaidUserRegister from "../../components/Register/PaidUserRegister";
import RegisterCard from "../../components/RegisterCard/RegisterCard";
import { serverPost } from "../../utils/api";
const RegisterPage = () => {
  
  
  const handleSubmit = async (event) => {
    const data = await serverPost('POST', 'register',event);
    console.log(data.message);
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
