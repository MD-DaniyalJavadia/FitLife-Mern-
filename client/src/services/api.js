// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/nutrition', // ← Apna backend URL
  withCredentials: true, // Important: Send cookies (JWT)
});

export default api;