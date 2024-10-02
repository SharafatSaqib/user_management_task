import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUser, updateUser } from '../features/userSlice';
import MultiStepForm from './MultiStepForm'; // Import your MultiStepForm component

const Users = () => {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.users);
  
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  const handleEdit = (user) => {
    setEditingUser(user); // Set the selected user to edit
    setShowForm(true); // Show the form
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingUser(null);
  };

  const handleUserSubmit = (userData) => {
    if (editingUser) {
      dispatch(updateUser({ id: editingUser._id, ...userData }));
    }
    handleCloseForm(); // Close the form after submission
  };

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h2 className="text-2xl font-semibold mb-5">User List</h2>

      {showForm && (
        <MultiStepForm
          initialData={editingUser} // Pass the editing user data
          onSubmit={handleUserSubmit}
          onClose={handleCloseForm}
        />
      )}

      {status === 'loading' ? (
        <p className="text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error fetching users: {error}</p>
      ) : (
        <ul className="bg-white shadow-md rounded-lg">
          {users.map((user) => (
            <li key={user._id} className="flex justify-between items-center border-b p-4 hover:bg-gray-100">
              <div className="flex flex-col">
                <span className="text-lg font-medium">{user.username}</span> {/* Show username */}
                <span className="text-sm text-gray-600">{user.email}</span>
                <span className="text-sm text-gray-600">Age: {user.age}</span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(user)} // Handle edit
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition duration-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Users;
