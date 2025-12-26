
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product, Order, Address } from '../types';
import { HUX_PRODUCT } from '../constants';
import { supabase } from '../src/lib/supabaseClient';

interface ShopContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  addToCart: (product: Product, color: string, size: number, quantity?: number) => void;
  removeFromCart: (index: number) => void;
  updateQuantity: (index: number, delta: number) => void;
  updateSize: (index: number, newSize: number) => void;
  clearCart: () => void;
  placeRazorpayOrder: (address: Address, email: string) => Promise<any>;
  verifyPayment: (response: any) => Promise<string>;
  products: Product[];
  placeOrder: (address: Address, paymentMethod: 'UPI' | 'Card' | 'COD') => Promise<string>; // Keeping for compatibility
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('hux_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('hux_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, color: string, size: number, quantity: number = 1) => {
    const existingIndex = cart.findIndex(item => item.product.id === product.id && item.color === color && item.size === size);
    if (existingIndex > -1) {
      const newCart = [...cart];
      newCart[existingIndex].quantity += quantity;
      setCart(newCart);
    } else {
      setCart(prev => [...prev, {
        product,
        color: color as any,
        size: size as any,
        quantity
      }]);
    }
    setIsCartOpen(true);
  };

  const removeFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const updateQuantity = (index: number, delta: number) => {
    setCart(prev => {
      const newCart = [...prev];
      const newQuantity = newCart[index].quantity + delta;
      if (newQuantity > 0) {
        newCart[index].quantity = newQuantity;
        return newCart;
      }
      return prev;
    });
  };

  const updateSize = (index: number, newSize: number) => {
    setCart(prev => {
      const newCart = [...prev];
      newCart[index].size = newSize as any;
      return newCart;
    });
  };

  const clearCart = () => setCart([]);

  // Legacy/Fallback placeholder
  const placeOrder = async (address: Address, paymentMethod: 'UPI' | 'Card' | 'COD'): Promise<string> => {
     return "ORDER-" + Date.now();
  };

  const placeRazorpayOrder = async (address: Address, email: string) => {
    const { data, error } = await supabase.functions.invoke('hux-pay', {
      body: { action: 'create_order', cart, address, email }
    });

    if (error || data?.error) throw new Error(data?.error || "Payment server unavailable");
    if (!data?.razorpayOrderId) throw new Error("Invalid Razorpay order session");

    return data;
  };

  const verifyPayment = async (response: any) => {
    const { data, error } = await supabase.functions.invoke('hux-pay', {
      body: {
        action: 'verify_payment',
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature
      }
    });

    if (error || data.status !== 'success') throw new Error('Payment verification failed');
    
    clearCart();
    localStorage.removeItem('prelaunchBooking');
    return String(data.orderId);
  };

  return (
    <ShopContext.Provider value={{
      cart,
      isCartOpen,
      setIsCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      updateSize,
      clearCart,
      placeRazorpayOrder,
      verifyPayment,
      placeOrder,
      products: [HUX_PRODUCT]
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used within ShopProvider');
  return context;
};
