import { useState, setState } from "react";
import {Link} from "react-router-dom";
const LoginPage = () => {
  const handleSubmit = (event) => {};
  const [loginData, setLoginData] = useState({
    name: "",
    email: "",
    goal: "",
    curWeight: 0,
  });

  const handleRegister = (event) => {
    window.location.href='/register';
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Login</h1>
      <form className="space-y-6" action="#" method="POST">
        <div>
          <label htmlFor="email" id="email" name="email" className="block text-sm font-medium leading-6 text-gray-900">
            Email:{" "}
          </label>
          <div className="mt-2">
            <input
              type="email"
              class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="joesmith@domain.com"
              autoComplete="email"
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" id="password" name="password" className="block text-sm font-medium leading-6 text-gray-900">
            Password:{" "}
          </label>
        </div>
        <div className="mt-2">
        <input
          type="password"
          class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          placeholder="**********"
        />
        </div>
        <button
          type="button"
          id="submit"
          class="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 bg-blue-700 focus:ring-inset  sm:max-w-xs sm:text-sm sm:leading-6 hover:bg-blue-900"
          onClick={handleSubmit()}
        >
          Log in
        </button>
        <p className="mt-10 text-center text-sm text-gray-500" >Don't have an account? Register Here.</p>
        <Link
          className="btn btn-primary"
          name="register"
          id="register"
          class="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset  sm:max-w-xs sm:text-sm sm:leading-6 hover:bg-gray-400"
          to="/register"
        >
          Register
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;
