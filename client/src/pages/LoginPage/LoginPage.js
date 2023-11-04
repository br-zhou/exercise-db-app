import { useState, setState } from "react";
const LoginPage = () => {
  const handleSubmit = (event) => {};
  const [loginData, setLoginData] = useState({
    name: "",
    email: "",
    goal: "",
    curWeight: 0,
  });

  const handleRegister = (event) => {};

  return (
    <div>
      <h1>Login</h1>
      <form>
        <label htmlFor="email" id="email" name="email">
          Email:{" "}
        </label>
        <input
          type="email"
          class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          placeholder="joesmith@domain.com"
          autoComplete="email"
        />
        <label htmlFor="password" id="password" name="password">
          Password:{" "}
        </label>
        <input
          type="password"
          class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          placeholder="**********"
        />

        <button
          type="submit"
          id="submit"
          class="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 bg-blue-700 focus:ring-inset  sm:max-w-xs sm:text-sm sm:leading-6 hover:bg-blue-900"
        >
          Log in
        </button>
        <p>Don't have an account? Register Here.</p>
        <button
          type="submit"
          name="register"
          id="register"
          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset  sm:max-w-xs sm:text-sm sm:leading-6 hover:bg-gray-400"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
