import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://readjourney.b.goit.study/api";

// Створюємо axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Інтерцептор для додавання токену до запитів
api.interceptors.request.use(
  (config) => {
    // Перевірка на клієнтську сторону
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Типи для API
export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  name: string;
  email: string;
  token: string;
  refreshToken: string;
}

export interface UserResponse {
  name: string;
  email: string;
  _id: string;
}

// API методи для авторизації
export const authAPI = {
  // Реєстрація
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post("/users/signup", data);
    return response.data;
  },

  // Вхід
  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await api.post("/users/signin", data);
    return response.data;
  },

  // Вихід
  logout: async (): Promise<void> => {
    await api.post("/users/signout");
  },

  // Отримати поточного користувача
  getCurrentUser: async (): Promise<UserResponse> => {
    const response = await api.get("/users/current");
    return response.data;
  },

  // Оновити токен
  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    const response = await api.get("/users/current/refresh", {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    return response.data;
  },
};

export default api;
