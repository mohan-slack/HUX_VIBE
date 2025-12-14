import React, { useState } from 'react';
import { Button } from '../components/Button';
import { supabase } from '../src/lib/supabaseClient';

export const About = () => (
  <div className="min-h-screen pt-32 px-6 bg-gradient-to-br from-[#f8f6f3] via-[#faf9f7] to-[#f5f3f0] relative overflow-hidden">
     {/* Decorative Background */}
     <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-100/20 to-transparent rounded-full blur-3xl"></div>
     <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-neutral-200/20 to-transparent rounded-full blur-3xl"></div>
     
     <div className="max-w-4xl mx-auto relative z-10">
       <h1 className="text-5xl md:text-6xl font-display font-bold mb-8 text-hux-dark text-center">Our Vision</h1>
       <p className="text-center text-xl text-neutral-600 mb-16 leading-relaxed">The convergence of fine jewelry, titanium engineering, and artificial intelligence.</p>
       
       <div className="space-y-12">
         <div className="backdrop-blur-xl bg-white/70 rounded-3xl p-8 border border-neutral-200/50 shadow-lg">
           <h2 className="text-2xl font-bold text-neutral-900 mb-4">Intelligence Worn</h2>
           <p className="text-neutral-600 leading-relaxed">
             HUX represents the future of personal wellness technology. We believe that health monitoring should be invisible, elegant, and effortless. Our smart ring combines aerospace-grade titanium with cutting-edge sensors to deliver clinical-grade insights without compromising on style.
           </p>
         </div>
         
         <div className="backdrop-blur-xl bg-white/70 rounded-3xl p-8 border border-neutral-200/50 shadow-lg">
           <h2 className="text-2xl font-bold text-neutral-900 mb-4">Designed for Life</h2>
           <p className="text-neutral-600 leading-relaxed">
             Every HUX ring is crafted with precision and purpose. From sleep tracking to stress detection, from heart rate monitoring to activity insights, we've engineered a device that adapts to your lifestyle. It's not just wearable technology—it's a companion for your wellness journey.
           </p>
         </div>
         
         <div className="backdrop-blur-xl bg-white/70 rounded-3xl p-8 border border-neutral-200/50 shadow-lg">
           <h2 className="text-2xl font-bold text-neutral-900 mb-4">Privacy First</h2>
           <p className="text-neutral-600 leading-relaxed">
             Your health data belongs to you. We never sell your information, and all insights are processed with enterprise-grade encryption. HUX is built on the foundation of trust, transparency, and respect for your privacy.
           </p>
         </div>
       </div>
     </div>
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
    
    // Try database lookup by tracking number first, then by UUID
    let { data, error } = await supabase
      .from('orders')
      .select('status, total_amount, created_at, shipping_address, tracking_number')
      .eq('tracking_number', orderId)
      .single();
    
    // If not found by tracking number, try UUID
    if (error) {
      const result = await supabase
        .from('orders')
        .select('status, total_amount, created_at, shipping_address, tracking_number')
        .eq('id', orderId)
        .single();
      data = result.data;
      error = result.error;
    }

    if (error) {
      setStatus({ error: "Order not found. Please check your ID." });
    } else {
      setStatus(data);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-32 px-6 bg-gradient-to-br from-[#f8f6f3] via-[#faf9f7] to-[#f5f3f0] relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-100/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-neutral-200/20 to-transparent rounded-full blur-3xl"></div>
      
      <div className="max-w-2xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-hux-dark">Support Center</h1>
          <p className="text-neutral-600 text-lg">Track your order or get help with your HUX ring</p>
        </div>
        
        <div className="backdrop-blur-xl bg-white/70 rounded-3xl p-8 border border-neutral-200/50 shadow-lg mb-8">
          <h2 className="text-xl font-bold text-neutral-900 mb-6">Track Your Order</h2>
          <form onSubmit={handleTrack} className="space-y-4">
            <input 
              type="text" 
              placeholder="Enter Tracking Number (e.g. HUX12345)" 
              className="w-full bg-white/80 border border-neutral-200 p-4 rounded-xl focus:border-hux-turquoise outline-none transition-all shadow-sm text-neutral-900"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value.toUpperCase())}
            />
            <Button variant="primary" fullWidth type="submit" disabled={loading}>
              {loading ? 'Locating...' : 'Track Status'}
            </Button>
          </form>
        </div>
        
        {status && (
          <div className="backdrop-blur-xl bg-white/70 rounded-3xl p-8 border border-neutral-200/50 shadow-lg animate-fadeIn">
             {status.error ? (
               <div className="text-center">
                 <p className="text-red-600 font-bold text-lg mb-2">Order Not Found</p>
                 <p className="text-neutral-600 text-sm">Please check your Order ID and try again</p>
               </div>
             ) : (
               <div className="space-y-4">
                 <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
                   <span className="text-neutral-600">Status</span>
                   <span className="text-hux-turquoise font-bold font-display text-xl">{status.status}</span>
                 </div>
                 <div className="flex items-center justify-between">
                   <span className="text-neutral-600">Order Date</span>
                   <span className="text-neutral-900 font-semibold">{new Date(status.created_at).toLocaleDateString()}</span>
                 </div>
                 <div className="flex items-center justify-between">
                   <span className="text-neutral-600">Total Amount</span>
                   <span className="text-neutral-900 font-semibold">₹{status.total_amount?.toLocaleString()}</span>
                 </div>
                 <div className="flex items-center justify-between">
                   <span className="text-neutral-600">Shipping To</span>
                   <span className="text-neutral-900 font-semibold">{status.shipping_address?.city}</span>
                 </div>
               </div>
             )}
          </div>
        )}
        
        <div className="mt-12 backdrop-blur-xl bg-white/70 rounded-3xl p-8 border border-neutral-200/50 shadow-lg">
          <h2 className="text-xl font-bold text-neutral-900 mb-4">Need Help?</h2>
          <p className="text-neutral-600 mb-6">Get instant answers with HUX AI or reach out to our support team.</p>
          
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-hux-turquoise to-blue-500 flex items-center justify-center text-white font-bold">
                AI
              </div>
              <div>
                <h3 className="font-bold text-neutral-900">HUX AI Assistant</h3>
                <p className="text-xs text-neutral-600">Available 24/7 for instant support</p>
              </div>
            </div>
            <p className="text-sm text-neutral-700 mb-4">
              Chat with our AI assistant for quick answers about your order, product features, sizing, and more.
            </p>
            <p className="text-xs text-neutral-500 italic">
              💡 Look for the chat icon in the bottom-right corner of your screen
            </p>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-neutral-700">
              <span className="font-semibold">Email:</span>
              <a href="mailto:support@hux.co.in" className="text-hux-turquoise hover:underline">support@hux.co.in</a>
            </div>
            <div className="flex items-center gap-3 text-neutral-700">
              <span className="font-semibold">Hours:</span>
              <span>Monday - Saturday, 9 AM - 6 PM IST</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Policies = () => (
  <div className="min-h-screen pt-32 px-6 bg-hux-body">
    <h1 className="text-center text-3xl font-bold">Policies</h1>
  </div>
);