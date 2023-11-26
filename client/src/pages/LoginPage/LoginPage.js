import { useState, setState } from "react";
import {serverPost} from "../../utils/api";
import LoginCard from "../../components/LoginCard/LoginCard";
const LoginPage = () => {
  const handleSubmit = async (event) => {
    console.log(event);
    console.log(await serverPost('POST', 'login-auth', event));
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
