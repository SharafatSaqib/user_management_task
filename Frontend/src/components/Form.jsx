// frontend/src/components/MultiStepForm/Step1.js
import React from 'react';

const Form = ({ formData, setFormData, nextStep }) => {
  const handleNext = () => {
    if (!formData.name) {
      alert('Name is required');
    } else {
      nextStep();
    }
  };

  return (
    <div>
      <h2>Step 1</h2>
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default Form;
