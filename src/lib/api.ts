import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

if (!BASE_URL) {
  throw new Error('VITE_API_URL environment variable is not set');
}

const api = axios.create({
  baseURL: `${BASE_URL}/v2`,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: false,
});

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response) {
      const message =
        error.response.data?.response_message ||
        error.response.data?.message ||
        error.response.data?.errors?.[0] ||
        error.message;
      return Promise.reject(new ApiError(message, error.response.status, error.response.data));
    }
    return Promise.reject(new ApiError('Network error. Please check your connection.', 0));
  },
);

export class ApiError extends Error {
  statusCode: number;
  data: unknown;

  constructor(message: string, statusCode: number, data?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.data = data;
  }
}

export function getAccessToken(): string | null {
  try {
    return localStorage.getItem('fendol_access_token');
  } catch {
    return null;
  }
}

export function setAccessToken(token: string | null): void {
  try {
    if (token) {
      localStorage.setItem('fendol_access_token', token);
    } else {
      localStorage.removeItem('fendol_access_token');
    }
  } catch {
    /* noop */
  }
}

export default api;
