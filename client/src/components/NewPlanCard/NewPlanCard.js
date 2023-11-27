import React, { createRef } from "react";
import { Link } from "react-router-dom";

const NewPlanCard = (props) => {
  const categoryRef = createRef();

  const onFormSubmit = (event) => {
    event.preventDefault();

    props.handleSubmit({
      category: categoryRef.current.value,
    });
  };

  return (
    <div className="w-80 px-0 pt-8 mx-auto">
      <div className="relative bg-white mx-auto text-center shadow-md p-8 text-lg">
        <h1 className="uppercase">New Plan</h1>
        <form onSubmit={onFormSubmit}>
          <input type="text" placeholder="category" ref={categoryRef} className="focus:outline-none bg-gray-200 w-full border-0 m-2 p-2 box-border text-sm" />

          {"TODO: implement checkbox array featuring all exercises, submit takes all checked exercises, adds to new plan."}

          <button className="font-roboto uppercase focus:outline-none bg-green-500 w-full border-0  m-2 p-2 text-white text-sm cursor-pointer">
            CREATE
          </button>

          Click <Link to="./.." className="text-green-500">Here</Link> To Cancel!

        </form>
      </div>
    </div>
  );
};

export default NewPlanCard;
