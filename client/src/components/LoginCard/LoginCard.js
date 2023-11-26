import React, { createRef } from "react";
import { Link } from "react-router-dom";

const LoginCard = (props) => {
  const emailRef = createRef();
  const passwordRef = createRef();

  const onFormSubmit = (event) => {
    event.preventDefault();

    props.handleSubmit({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
  };

  return (
    <div className="w-80 px-0 pt-8 mx-auto">
      <div className="relative bg-white mx-auto text-center shadow-md p-8 text-lg">
        <h1 className="uppercase">Login</h1>
        <form onSubmit={onFormSubmit}>
          <input type="text" placeholder="username" ref={emailRef} className="focus:outline-none bg-gray-200 w-full border-0 m-2 p-2 box-border text-sm" />
          <input type="password" placeholder="password" ref={passwordRef} className="focus:outline-none bg-gray-200 w-full border-0 m-2 p-2 box-border text-sm" />
          <button className="font-roboto uppercase focus:outline-none bg-green-500 w-full border-0  m-2 p-2 text-white text-sm cursor-pointer">
            LOGIN
          </button>

          Click <Link to={props.registerHref} className="text-green-500">Here</Link> To Register!

        </form>
      </div>
    </div>
  );
};

export default LoginCard;
