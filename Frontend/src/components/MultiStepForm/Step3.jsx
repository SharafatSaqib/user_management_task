// frontend/src/components/MultiStepForm/Step3.js
import React, { useState } from 'react';

const Step3 = ({ formData, setFormData, prevStep, submit }) => {
  const [error, setError] = useState('');

  const validate = () => {
    if (formData.age < 0 || isNaN(formData.age)) {
      setError('Age must be a positive number');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = () => {
    if (validate()) {
      submit(); // Call submit function if valid
    }
  };

  return (
    <div className="max-w-md mx-auto p-5 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Step 3: Additional Information</h2>
      <input
        type="number"
        placeholder="Age"
        value={formData.age || ''} // Use an empty string if age is undefined
        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
        className="border rounded-md py-2 px-3 w-full mb-4"
        min="0" // Set minimum value to 0
        required
      />
      {error && <p className="text-red-500 text-sm">{error}</p>} {/* Display error */}
      <button onClick={prevStep} className="bg-gray-500 text-white py-2 px-4 rounded mr-2 hover:bg-gray-600">
        Previous
      </button>
      <button onClick={handleSubmit} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        Submit
      </button>
    </div>
  );
};

export default Step3;
