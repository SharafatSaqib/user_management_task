import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../features/userSlice';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      email: email, // Ensure this matches what the backend checks for
      password: password,
    };

    try {
      await dispatch(loginUser(userData)).unwrap(); // Await the dispatch and unwrap the promise
      navigate('/'); // Navigate to the home page on successful login
    } catch (error) {
      console.error('Login failed:', error);
      // You can also show a user-friendly error message here if needed
    }
  };

  return (
    <div className="max-w-md mx-auto p-5 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
