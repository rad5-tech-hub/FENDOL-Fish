export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  tag: string;
  image: string;
  details?: string;
  origin?: string;
  shelfLife?: string;
  weightOptions?: string[];
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

export interface AuthState {
  user: Agent | null;
  isAuthenticated: boolean;
}
