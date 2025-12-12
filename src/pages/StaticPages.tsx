
import React, { useState } from 'react';
import { Button } from '../components/Button';
import { supabase } from '../lib/supabaseClient';

export const About = () => (
  <div className="min-h-screen pt-32 px-6 bg-hux-body">
     <h1 className="text-5xl font-display font-bold mb-8 text-hux-dark text-center">About HUX.</h1>
     <p className="text-center max-w-2xl mx-auto text-neutral-600">The convergence of fine jewelry, titanium engineering, and artificial intelligence.</p>
  </div>
);

// 6️⃣ REAL ORDER TRACKING
export const TrackOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    
    const { data, error } = await supabase
      .from('orders')
      .select('status, total_amount, created_at, shipping_address')
      .eq('id', orderId)
      .single();

    if (error) {
      setStatus({ error: "Order not found. Please check your ID." });
    } else {
      setStatus(data);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-32 px-6 bg-hux-body flex flex-col items-center">
      <h1 className="text-4xl font-display font-bold mb-8 text-hux-dark">Track Your HUX</h1>
      <form onSubmit={handleTrack} className="w-full max-w-md space-y-4">
        <input 
          type="text" 
          placeholder="Enter Order ID (e.g. 123e4567-e89b...)" 
          className="w-full bg-white border border-neutral-200 p-4 rounded-lg focus:border-hux-turquoise outline-none"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <Button variant="primary" fullWidth type="submit" disabled={loading}>{loading ? 'Locating...' : 'Track Status'}</Button>
      </form>
      {status && (
        <div className="mt-8 p-6 bg-white border border-neutral-200 rounded-xl w-full max-w-md shadow-lg">
           {status.error ? (
             <p className="text-red-500 font-bold">{status.error}</p>
           ) : (
             <div className="space-y-2">
               <p className="text-hux-turquoise font-bold font-display text-xl">{status.status}</p>
               <p className="text-sm text-neutral-500">Ordered on: {new Date(status.created_at).toLocaleDateString()}</p>
               <p className="text-sm text-neutral-500">Total: ₹{status.total_amount}</p>
               <p className="text-sm text-neutral-500">Shipping to: {status.shipping_address?.city}</p>
             </div>
           )}
        </div>
      )}
    </div>
  );
};

export const Policies = () => (
  <div className="min-h-screen pt-32 px-6 bg-hux-body">
    <h1 className="text-center text-3xl font-bold">Policies</h1>
  </div>
);
