import React, {useState} from "react";
import PaidUserRegister from "../../components/Register/PaidUserRegister";


const RegisterPage = () => {

    const [metricOption, setMetricOption] = useState("lbs");
    const [paidStatus, setPaidStatus] = useState("paid-no");
    const handleMetricChange = (e) => {
      setMetricOption(e.target.value)
    };
    const handlePaidChange = (e) => {
      setPaidStatus(e.target.value)
      if (paidStatus === "paid-yes") {

      }
    };




  return (
    <div>
      <h1>Register</h1>
        <form>
          <label
            htmlFor="name"
            class="block text-sm font-medium leading-6 text-gray-900"
          >
            Name:{""}
          </label>
          <input type="text" id="name" autoComplete="name" placeholder="John Doe"/>
          <br />

          <label
            htmlFor="email"
            class="block text-sm font-medium leading-6 text-gray-900"
          >
            Email:{""}
          </label>
          <input type="email" id="email" autoComplete="email" placeholder="johndoe@domain.com"/>
          <br />

          <label
            htmlFor="goal"
            class="block text-sm font-medium leading-6 text-gray-900"
          >
            What do you want to achieve with FitApp?{" "}
          </label>
          <select
            name="goal"
            id="goal"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
          >
            <option value="weight-loss">Lose weight</option>
            <option value="gain-muscle">Gain muscle</option>
            <option value="endurance">Endurance Training</option>
          </select>
          <br />
          <div className="relative mt-2 rounded-md shadow-sm">
            <label htmlFor="cur-weight" className="block text-sm font-medium leading-6 text-gray-900">Current Weight: </label>
            <input type="number" id="cur-weight" className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
              <label>
              <input
              type="radio"
              onChange={handleMetricChange}
              checked={metricOption === "lbs"}
              name="weight-measure"
              value="lbs"
              className="" 
              />
              lbs
              </label>
              <label>
              <input
              type="radio"
              onChange={handleMetricChange}
              checked={metricOption === "kgs"}
              name="weight-measure"
              value="kgs"
              className="weight-system-input" 
              />
              kgs
              </label>
              <br/><br/>
          </div>
          <div>
            <p>Are you interested in subscribing?</p>
            <label><input type="radio"
              onChange={handlePaidChange}
              checked={paidStatus === "paid-yes"}
              name="paid-status"
              value="paid-yes"
              className="" />Yes</label>
            <label><input type="radio"
              onChange={handlePaidChange}
              checked={paidStatus === "paid-no"}
              name="paid-status"
              value="paid-no"
              className="" />No</label>
          </div>
          {paidStatus === "paid-yes" ? (
            <PaidUserRegister/>) : (
              <div></div>
            )}
          <button
            type="submit"
            name="submit"
            id="register"
            class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Get started
          </button>
        </form>
    </div>
  );
};

export default RegisterPage;
