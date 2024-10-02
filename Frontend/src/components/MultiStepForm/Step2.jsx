// frontend/src/components/MultiStepForm/Step2.js
import React, { useState } from 'react';

const Step2 = ({ formData, setFormData, nextStep, prevStep }) => {
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    // Basic email validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleNext = () => {
    if (!formData.email) {
      setError('Email is required');
    } else if (!validateEmail(formData.email)) {
      setError('Invalid email format');
    } else {
      setError('');
      nextStep(); // Proceed to next step
    }
  };

  return (
    <div className="max-w-md mx-auto p-5 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Step 2: Contact Information</h2>
      <input
        type="email"
        placeholder="Email"
        value={formData.email || ''} // Ensure it defaults to an empty string if undefined
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="border rounded-md py-2 px-3 w-full mb-4"
        required
      />
      {error && <p className="text-red-500 text-sm">{error}</p>} {/* Display error */}
      <button onClick={prevStep} className="bg-gray-500 text-white py-2 px-4 rounded mr-2 hover:bg-gray-600">
        Previous
      </button>
      <button onClick={handleNext} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        Next
      </button>
    </div>
  );
};

export default Step2;
