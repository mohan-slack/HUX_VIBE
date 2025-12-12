import React from 'react';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Button } from './Button';
import { useNavigate } from 'react-router-dom';

export const CartDrawer = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity } = useShop();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  const getColorHex = (color: string) => {
    switch(color) {
      case 'Tarnish Grey': return '#6B7280'; // Metallic Grey
      case 'Sterling Gold': return '#EAB308';
      case 'Lunar Rose': return '#FDA4AF';
      default: return '#E5E7EB';
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-hux-dark/20 backdrop-blur-sm"
        onClick={() => setIsCartOpen(false)}
      />
      
      {/* Drawer */}
      <div className="relative w-full max-w-md bg-hux-ivory h-full shadow-2xl flex flex-col transform transition-transform duration-300 animate-slideUp">
        <div className="p-6 border-b border-neutral-200 flex items-center justify-between bg-white/50 backdrop-blur-md">
          <h2 className="text-xl font-display font-bold text-hux-dark">Your Bag</h2>
          <button onClick={() => setIsCartOpen(false)} className="text-neutral-400 hover:text-hux-dark">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="text-center py-20 flex flex-col items-center">
              <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mb-4 text-neutral-300">
                 <ShoppingBag size={24} />
              </div>
              <p className="text-neutral-500 mb-6 font-medium">Your shopping bag is empty.</p>
              <Button variant="outline" onClick={() => setIsCartOpen(false)}>Continue Browsing</Button>
            </div>
          ) : (
            cart.map((item, index) => (
              <div key={`${item.product.id}-${item.color}-${item.size}`} className="flex gap-4 p-4 bg-white/60 border border-white rounded-2xl shadow-sm">
                <div className="w-20 h-20 bg-white rounded-xl flex-shrink-0 flex items-center justify-center relative overflow-hidden border border-neutral-100">
                  <div 
                    className="w-10 h-10 rounded-full border-[3px] border-white shadow-md transform rotate-45"
                    style={{ backgroundColor: getColorHex(item.color) }}
                  ></div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-hux-dark font-display text-sm">{item.product.name}</h3>
                      <p className="text-xs text-neutral-500 mt-1">{item.color} | Size {item.size}</p>
                    </div>
                    <button onClick={() => removeFromCart(index)} className="text-neutral-400 hover:text-red-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex items-center gap-3 bg-white rounded-lg px-2 py-1 border border-neutral-100 shadow-sm">
                      <button onClick={() => updateQuantity(index, -1)} className="p-1 hover:text-hux-turquoise text-neutral-500 transition-colors"><Minus size={14} /></button>
                      <span className="text-xs font-bold w-4 text-center text-hux-dark">{item.quantity}</span>
                      <button onClick={() => updateQuantity(index, 1)} className="p-1 hover:text-hux-turquoise text-neutral-500 transition-colors"><Plus size={14} /></button>
                    </div>
                    <p className="font-bold text-hux-turquoise text-sm">₹{(item.product.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-neutral-200 bg-white/80 backdrop-blur-md">
            <div className="flex justify-between mb-4 text-sm font-bold font-display text-hux-dark">
              <span>Subtotal</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
            <p className="text-[10px] text-neutral-400 mb-6 text-center uppercase tracking-wider">Shipping & taxes calculated at checkout</p>
            <Button variant="primary" fullWidth onClick={handleCheckout}>Proceed to Checkout</Button>
          </div>
        )}
      </div>
    </div>
  );
};