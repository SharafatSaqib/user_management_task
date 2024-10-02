import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch and useSelector
import { logout } from '../features/userSlice'; // Import the logout action

const Header = () => {
  const dispatch = useDispatch(); // Get the dispatch function
  const isLoggedIn = useSelector((state) => state.users.isLoggedIn); // Access login state from Redux

  const handleLogout = () => {
    dispatch(logout()); // Call logout action on logout
    localStorage.removeItem('users'); // Optionally clear users from local storage
  };

  return (
    <header className="sticky top-0 bg-white shadow-lg z-10 font-sans">
      <div className="max-w-4xl mx-auto p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">User Management App</h1>
        
        <nav className="flex space-x-4 font-sans font-semibold">
          <Link to="/" className="text-gray-500 hover:underline text-xl font-semibold">Home</Link>
          <Link to="/about" className="text-gray-500 hover:underline text-xl">About</Link>
          <Link to="/images" className="text-gray-500 hover:underline text-xl">LazyImages</Link>

          {/* Conditional rendering for login/sign-up or logout */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-gray-500 hover:underline text-xl"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="text-gray-500 hover:underline text-xl">Login</Link>
              <Link to="/signup" className="text-gray-500 hover:underline text-xl">Sign Up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
