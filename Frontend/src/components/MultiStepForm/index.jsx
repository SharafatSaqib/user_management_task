import React, { useState, useEffect } from 'react';

const MultiStepForm = ({ initialData, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    age: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData); // Initialize form with editing user's data
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Add validation for age to prevent negative values
    if (name === 'age' && value < 0) {
      return; // Do not update the state if the value is negative
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md rounded-lg">
      <div>
        <label htmlFor="username" className="block text-sm font-medium">
          Username:
        </label>
        <input
          type="text"
          name="username"
          id="username"
          value={formData.username} // Display username for editing
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email:
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label htmlFor="age" className="block text-sm font-medium">
          Age:
        </label>
        <input
          type="number"
          name="age"
          id="age"
          value={formData.age}
          onChange={handleChange}
          min="0" // Set min attribute to prevent negative values
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mt-4 flex justify-end space-x-2">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default MultiStepForm;
