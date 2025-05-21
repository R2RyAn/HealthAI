import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export interface User {
  id: number;
  name: string;
  email: string;
  // Add other user properties as needed
}
