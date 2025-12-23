import { supabase } from '../src/lib/supabaseClient';

export interface OrderStatus {
  id: string;
  status: string;
  total_amount: number;
  created_at: string;
  guest_email?: string;
  razorpay_order_id?: string;
  items?: {
    product_id: number;
    color: string;
    size: string;
    quantity: number;
  }[];
}

export const getOrderByEmail = async (email: string): Promise<OrderStatus[]> => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        id,
        status,
        total_amount,
        created_at,
        guest_email,
        razorpay_order_id,
        order_items (
          product_id,
          color,
          size,
          quantity
        )
      `)
      .eq('guest_email', email)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    return [];
  }
};

export const getOrderById = async (orderId: string): Promise<OrderStatus | null> => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        id,
        status,
        total_amount,
        created_at,
        guest_email,
        razorpay_order_id,
        order_items (
          product_id,
          color,
          size,
          quantity
        )
      `)
      .eq('id', orderId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    return null;
  }
};