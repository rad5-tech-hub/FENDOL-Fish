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
