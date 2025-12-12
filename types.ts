export type ProductColor = 'Tarnish Grey' | 'Sterling Gold' | 'Lunar Rose';
export type RingSize = 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;

export interface Product {
  id: string;
  name: string;
  tagline: string;
  subtitle: string;
  price: number;
  mrp: number;
  description: string;
  features: string[];
  specs: {
    material: string;
    battery: string;
    waterproof: string;
    sensors: string[];
    connectivity: string;
    certifications: string[];
  };
  reviews: Review[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  verified: boolean;
  avatar?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface CartItem {
  product: Product;
  color: ProductColor;
  size: RingSize;
  quantity: number;
}

export interface Address {
  fullName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  address: Address;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered';
  paymentMethod: 'UPI' | 'Card' | 'COD';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}