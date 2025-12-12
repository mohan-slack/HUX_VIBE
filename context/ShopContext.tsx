
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product, Order, Address } from '../types';
import { HUX_PRODUCT } from '../constants';
import { supabase } from '../src/lib/supabaseClient';

interface ShopContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  addToCart: (color: string, size: number) => void;
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

  const addToCart = (color: string, size: number) => {
    const existingIndex = cart.findIndex(item => item.color === color && item.size === size);
    if (existingIndex > -1) {
      const newCart = [...cart];
      newCart[existingIndex].quantity += 1;
      setCart(newCart);
    } else {
      setCart(prev => [...prev, {
        product: HUX_PRODUCT,
        color: color as any,
        size: size as any,
        quantity: 1
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

  // 5️⃣ RAZORPAY FRONTEND PAYMENT FLOW (Part 1: Create Order)
  const placeRazorpayOrder = async (address: Address, email: string) => {
    console.log("Calling hux-pay edge function...");
    console.log("Cart:", cart);
    console.log("Address:", address);

    const { data, error } = await supabase.functions.invoke('hux-pay', {
      body: { 
        action: 'create_order', 
        cart, 
        address, 
        email 
      }
    });

    console.log("Response data:", data);
    console.log("Response error:", error);

    if (error) {
      console.error("Edge Function Error:", error);
      throw new Error(data?.error || "Payment server unavailable. Please try again.");
    }

    if (data?.error) {
      console.error("Edge function returned error:", data.error);
      throw new Error(data.error);
    }

    if (!data?.razorpayOrderId) {
      console.error("Invalid response data:", data);
      throw new Error("Invalid Razorpay order session. Please refresh and retry.");
    }

    return data; // ✅ This must return orderId, razorpayOrderId, amount, key
  };

  // 5️⃣ RAZORPAY FRONTEND PAYMENT FLOW (Part 2: Verify)
  const verifyPayment = async (response: any) => {
    try {
      const { data, error } = await supabase.functions.invoke('hux-pay', {
        body: {
          action: 'verify_payment',
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature
        }
      });

      if (error) throw error;
      
      if (data.status === 'success') {
        // Double Check: Read back the order to ensure it exists and is updated
        const { data: orderCheck, error: readError } = await supabase
            .from('orders')
            .select('status, id')
            .eq('id', data.orderId)
            .single();
            
        if (readError) console.warn("Could not verify order status after payment:", readError);
        console.log("Payment Verified. Order Status:", orderCheck?.status);

        clearCart();
        return data.orderId;
      } else {
        throw new Error('Payment verification failed');
      }
    } catch (err) {
      console.error("Verification Failed:", err);
      throw err;
    }
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
