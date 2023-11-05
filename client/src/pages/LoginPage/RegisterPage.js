const RegisterPage = () => {
  return (
    <form>
      <label
        htmlFor="name"
        class="block text-sm font-medium leading-6 text-gray-900"
      >
        Name:{" "}
      </label>
      <input type="text" id="name" value="name" />
      <br />

      <label
        htmlFor="email"
        class="block text-sm font-medium leading-6 text-gray-900"
      >
        Email:{" "}
      </label>
      <input type="email" id="email" value="email" />
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
      <button
        type="submit"
        name="submit"
        id="register"
        class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Get started
      </button>
    </form>
  );
};

export default RegisterPage;
