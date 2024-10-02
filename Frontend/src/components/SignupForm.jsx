import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signupUser } from '../features/userSlice';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      username,
      email,
      password,
      age,
    };

    try {
      await dispatch(signupUser(userData)).unwrap(); // Ensure this returns the expected response
      navigate('/login'); // Navigate to the login page on successful signup
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-5 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="username">Username</label>
          <input
            className="border rounded-md py-2 px-3 w-full"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
          <input
            className="border rounded-md py-2 px-3 w-full"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
          <input
            className="border rounded-md py-2 px-3 w-full"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="age">Age</label>
          <input
            className="border rounded-md py-2 px-3 w-full"
            type="number"
            id="age"
            min='0'
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
