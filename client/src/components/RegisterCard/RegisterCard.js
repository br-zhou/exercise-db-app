import React, { createRef } from "react";
import { Link } from "react-router-dom";

const RegisterCard = (props) => {
  const emailRef = createRef();
  const passwordRef = createRef();
  const nameRef = createRef();
  const cityRef = createRef();
  const countryRef = createRef();
  const postalRef = createRef();
  const freeUserRef = createRef();

  const onFormSubmit = (event) => {
    event.preventDefault();

    props.handleSubmit({
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      city: cityRef.current.value,
      country: countryRef.current.value,
      postal: postalRef.current.value,
      freeUser: freeUserRef.current.checked
    });
  };

  return (
    <div className="w-80 px-0 pt-8 mx-auto">
      <div className="relative bg-white mx-auto text-center shadow-md p-8 text-lg">
        <h1 className="uppercase">Register</h1>
        <form onSubmit={onFormSubmit}>
          <input
            type="text"
            placeholder="full name"
            ref={nameRef}
            className="focus:outline-none bg-gray-200 w-full border-0 m-2 p-2 box-border text-sm"
          />
          <input
            type="text"
            placeholder="email"
            ref={emailRef}
            className="focus:outline-none bg-gray-200 w-full border-0 m-2 p-2 box-border text-sm"
          />
          <input
            type="password"
            placeholder="password"
            ref={passwordRef}
            className="focus:outline-none bg-gray-200 w-full border-0 m-2 p-2 box-border text-sm"
          />
          <input
            type="text"
            placeholder="city"
            ref={cityRef}
            className="focus:outline-none bg-gray-200 w-full border-0 m-2 p-2 box-border text-sm"
          />
          <input
            type="text"
            placeholder="country"
            ref={countryRef}
            className="focus:outline-none bg-gray-200 w-full border-0 m-2 p-2 box-border text-sm"
          />
          <input
            type="text"
            placeholder="postal code"
            ref={postalRef}
            className="focus:outline-none bg-gray-200 w-full border-0 m-2 p-2 box-border text-sm"
          />
          <input type="checkbox" ref={freeUserRef}/> 
          <span>Free User?</span>
          <button className="font-roboto uppercase focus:outline-none bg-green-500 w-full border-0  m-2 p-2 text-white text-sm cursor-pointer">
            REGISTER
          </button>
          Click{" "}
          <Link to={props.registerHref} className="text-green-500">
            Here
          </Link>{" "}
          To Login!
        </form>
      </div>
    </div>
  );
};

export default RegisterCard;
