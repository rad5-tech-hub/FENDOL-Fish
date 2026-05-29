export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  tag: string;
  image: string;
  unit?: string;
  quantityAvailable?: number;
  details?: string;
  origin?: string;
  shelfLife?: string;
  weightOptions?: string[];
}

export interface ApiProduct {
  id: string;
  productName: string;
  unit: string;
  basePrice: number;
  imageUrl: string | null;
  quantityAvailable: number;
}

export interface CartItem extends Product {
  quantity: number;
  selectedWeight?: string;
}

export interface User {
  id: string;
  email: string;
  role: 'user' | 'admin';
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'agent';
  referralCode: string;
  referralLink: string;
  earnings: number;
  totalReferrals: number;
  createdAt: string;
}

export interface Customer {
  id: string;
  fullName: string;
  email: string;
  emailVerified: boolean;
  accessToken: string;
  expiresIn: string;
}

export interface ApiResponse<T> {
  success: boolean;
  response_message: string;
  data?: T;
  error?: {
    name: string;
    message: string;
    statusCode: number;
  };
}

export interface SignupPayload {
  fullName: string;
  email: string;
  password: string;
  address: string;
  phone?: string;
  category?: string;
}

export interface VerifyOtpPayload {
  email: string;
  otp: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthData {
  id: string;
  fullName: string;
  email: string;
  emailVerified: boolean;
  accessToken: string;
  expiresIn: string;
}

export interface AuthState {
  user: Agent | null;
  customer: Customer | null;
  isAuthenticated: boolean;
}
