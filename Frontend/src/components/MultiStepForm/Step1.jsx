// frontend/src/components/MultiStepForm/Step1.js
import React, { useState } from 'react';

const Step1 = ({ nextStep, handleChange, values }) => {
  const [error, setError] = useState('');

  const validate = () => {
    if (!values.name) {
      setError('Name is required');
      return false;
    }
    setError('');
    return true;
  };

  const handleNext = () => {
    if (validate()) {
      nextStep(values); // Pass values to nextStep
    }
  };

  return (
    <div className="max-w-md mx-auto p-5 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Step 1: Personal Information</h2>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="name">Name</label>
          <input
            className="border rounded-md py-2 px-3 w-full"
            type="text"
            id="name"
            name="name"
            value={values.name || ''} // Ensure it defaults to an empty string if undefined
            onChange={handleChange}
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>} {/* Display error */}
        </div>
       
        <button
          type="button"
          onClick={handleNext} // Call handleNext for validation
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default Step1;
