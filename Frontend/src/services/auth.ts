import { api } from "@/lib/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface LoginData {
  email: string;
  password: string;
}

export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  age: number;
  gender: string;
  heightCm: number;
  weightKg: number;
  goalType: string;
}

export interface AuthResponse {
  message: string;
  token?: string;
  user?: any;
}

const TOKEN_KEY = "auth_token";

export const authService = {
  async login(data: LoginData): Promise<AuthResponse> {
    try {
      const response = await api.post("/auth/login", data);
      const { token, user } = response.data;

      if (token) {
        await AsyncStorage.setItem(TOKEN_KEY, token);
        // Set token in axios headers for future requests
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }

      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  },

  async signup(data: SignupData): Promise<AuthResponse> {
    try {
      const response = await api.post("/auth/signup", data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Signup failed");
    }
  },

  async logout(): Promise<void> {
    await AsyncStorage.removeItem(TOKEN_KEY);
    delete api.defaults.headers.common["Authorization"];
  },

  async getToken(): Promise<string | null> {
    return await AsyncStorage.getItem(TOKEN_KEY);
  },

  async setToken(token: string): Promise<void> {
    await AsyncStorage.setItem(TOKEN_KEY, token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  },
};
