// frontend/src/services/api.js
import axios from 'axios';


export const fetchUsersAPI = async () => {
  const response = await axios.get('http://localhost:5000/api/users');
  return response.data;
};


export const cacheFetch = async (key, fetchFn) => {
  const cachedData = localStorage.getItem(key);
  if (cachedData) {
    return JSON.parse(cachedData);
  }

  const data = await fetchFn();
  localStorage.setItem(key, JSON.stringify(data));
  return data;
};
