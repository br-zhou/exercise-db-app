import React from "react";

const FormGoalButton
 = ({ closeModal }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    // You can send the form data to your server or perform other actions
    closeModal(); // Close the modal after form submission
  };

  return (
      <div className="max-w-sm mx-auto mt-8 p-4 bg-white rounded-lg shadow-lg">
      <div className="modal bg-white w-96 p-8 rounded-lg shadow-lg">
        <span className="close absolute top-2 right-2 text-gray-600 cursor-pointer" onClick={closeModal}>
          &times;
        </span>
        <h2 className="text-2xl font-bold mb-4">Create a New Goal</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600">Category:</label>
            <input
              type="text"
              name="category"
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600">Weight:</label>
            <input
              type="text"
              name="weight"
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-600">Date:</label>
            <input
              type="text"
              name="date"
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormGoalButton
;
