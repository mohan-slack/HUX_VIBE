import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Check } from 'lucide-react';
import { Button } from '../components/Button';

export const OrderSuccess = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4 text-white">
      <div className="text-center max-w-md bg-[#161616] p-12 rounded-[2.5rem] shadow-2xl border border-white/5">
        <div className="w-24 h-24 bg-gradient-to-br from-hux-gold to-yellow-600 text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(234,179,8,0.3)] animate-fadeIn">
          <Check size={48} strokeWidth={3} />
        </div>
        <h1 className="text-4xl font-display font-bold mb-4 text-white">Confirmed</h1>
        <p className="text-neutral-400 mb-2 font-medium">Your journey to better health begins now.</p>
        <p className="text-xs text-neutral-500 mb-8 uppercase tracking-widest bg-black/30 py-2 px-4 rounded-full inline-block">Order ID: <span className="font-mono text-hux-gold font-bold">{id}</span></p>
        <Button className="bg-hux-gold text-black hover:bg-yellow-400 px-8 py-3 rounded-lg font-bold" onClick={() => navigate('/track')}>Track Order</Button>
      </div>
    </div>
  );
};