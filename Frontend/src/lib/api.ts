import axios from "axios";

export const api = axios.create({
  baseURL: "http://10.0.0.169:8080/api",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log("Response:", response);
    return response;
  },
  (error) => {
    console.error("Response Error:", error);
    return Promise.reject(error);
  }
);

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  password: string;
  age: number;
  gender: string;
  heightCm: number;
  weightKg: number;
  goalType: string;
  createdAt: string;
  updatedAt: string;
}
