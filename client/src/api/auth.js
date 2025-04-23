import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000', 
  withCredentials: true, 
});

export const register = (formData) => API.post('/api/auth/register', formData);
export const login = (formData) => API.post('/api/auth/login', formData);