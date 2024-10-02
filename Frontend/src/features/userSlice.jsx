import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Base URL for the API
const API_URL = 'http://localhost:5000/api';

// Async thunk to fetch users from the API
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
});

// Async thunk to login a user
export const loginUser = createAsyncThunk('users/loginUser', async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data; // Ensure this returns the expected response
});


// Async thunk to signup a user
export const signupUser = createAsyncThunk('users/signupUser', async (userData) => {
  const response = await axios.post(`${API_URL}/signup`, userData);
  return response.data; // Ensure this returns the expected response
});

// Async thunk to delete a user
export const deleteUser = createAsyncThunk('users/deleteUser', async (id) => {
  await axios.delete(`${API_URL}/users/${id}`);
  return id; // Return the id of the deleted user
});

// Async thunk to update an existing user
export const updateUser = createAsyncThunk('users/updateUser', async (user) => {
  const response = await axios.put(`${API_URL}/users/${user.id}`, user);
  return response.data;
});

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    status: 'idle',
    error: null,
    isLoggedIn: !!localStorage.getItem('isLoggedIn'), // Check if the user is logged in from localStorage
  },
  reducers: {
    setLoginStatus: (state, action) => {
      state.isLoggedIn = action.payload;
      if (action.payload) {
        localStorage.setItem('isLoggedIn', 'true'); // Persist login status
      } else {
        localStorage.removeItem('isLoggedIn'); // Remove login status on logout
      }
    },
    logout: (state) => {
      state.isLoggedIn = false;
      localStorage.removeItem('isLoggedIn'); // Clear login status
      localStorage.removeItem('users'); // Optionally clear users from localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchUsers async thunk
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading'; // Set loading status while fetching users
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded'; // Set succeeded status
        state.users = action.payload; // Populate the users array with data from the API
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed'; // Set failed status
        state.error = action.error.message; // Capture error message
      })
  
      // Handle loginUser async thunk
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        localStorage.setItem('isLoggedIn', 'true'); // Set login status in localStorage
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.error = action.error.message;
      })
  
      // Handle other actions (like deleteUser, updateUser)
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user._id !== action.payload);
      });
  },
  
});

// Export the reducer and actions
export const { setLoginStatus, logout } = userSlice.actions; // Export the actions
export default userSlice.reducer;
