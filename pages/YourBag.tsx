import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Button } from '../components/Button';
import { ShieldCheck, Truck, Lock, X, Trash2, Minus, Plus, Ruler, Activity } from 'lucide-react';

const SIZES = [6, 7, 8, 9, 10, 11, 12, 13];

export const YourBag = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, updateSize } = useShop();
  
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getColorHex = (color: string) => {
    return color === 'Tarnish Grey' ? '#6B7280' : '#EAB308';
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showSizingModal, setShowSizingModal] = useState(false);
  const [includeSizingKit, setIncludeSizingKit] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f8f6f3] via-[#faf9f7] to-[#f5f3f0] selection:bg-neutral-200 selection:text-neutral-900 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-100/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-neutral-200/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-stone-100/10 to-amber-50/10 rounded-full blur-[100px]"></div>
        
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Your Bag is Empty</h2>
            <p className="text-neutral-600 mb-8">Add items to get started</p>
            <button
              onClick={() => navigate('/')}
              className="bg-neutral-900 text-white px-8 py-3 rounded-xl font-semibold hover:bg-neutral-800 transition-colors shadow-lg"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f6f3] via-[#faf9f7] to-[#f5f3f0] selection:bg-neutral-200 selection:text-neutral-900 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-100/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-neutral-200/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-stone-100/10 to-amber-50/10 rounded-full blur-[100px]"></div>
      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-16 relative z-10">
        <button 
          onClick={() => navigate('/')} 
          className="text-neutral-600 hover:text-neutral-900 mb-8 flex items-center gap-2 text-sm font-medium transition-colors"
        >
          ← Continue Shopping
        </button>

        <h1 className="text-4xl font-bold text-neutral-900 mb-12">Your Bag</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, idx) => (
              <div key={idx} className="backdrop-blur-xl bg-white/70 rounded-2xl p-6 border border-neutral-200/50 shadow-lg">
                <div className="flex gap-6">
                  {/* Product Image */}
                  <div className="w-24 h-24 rounded-xl border-2 border-neutral-200 flex-shrink-0 overflow-hidden bg-white flex items-center justify-center">
                    {item.color === 'Tarnish Grey' ? (
                      <img 
                        src="/images/productImages/ring-angle-3.png" 
                        alt="HUX Smart Ring - Tarnish Grey"
                        className="w-full h-full object-contain"
                      />
                    ) : item.color === 'Sterling Gold' ? (
                      <img 
                        src="/images/productImages/ring-angle-4.png" 
                        alt="HUX Smart Ring - Sterling Gold"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div 
                        className="w-full h-full rounded-lg"
                        style={{ backgroundColor: getColorHex(item.color) }}
                      />
                    )}
                  </div>
                  
                  {/* Item Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-neutral-900">{item.product.name}</h3>
                        <p className="text-sm text-neutral-600">{item.color}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(idx)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors text-neutral-500 hover:text-red-600"
                        title="Remove"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    {/* Size Selector Section */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-neutral-700 mb-3">SELECT YOUR RING SIZE</h4>
                      
                      {/* Circular Size Buttons */}
                      <div className="grid grid-cols-4 gap-2 mb-4 sm:flex sm:overflow-x-auto">
                        {SIZES.map((size) => (
                          <button
                            key={size}
                            onClick={() => updateSize(idx, size)}
                            className={`w-12 h-12 flex-shrink-0 rounded-full border-2 transition-all font-semibold text-xs ${
                              item.size === size
                                ? 'border-neutral-900 bg-neutral-900 text-white shadow-lg scale-110'
                                : 'border-neutral-300 bg-white text-neutral-700 hover:border-neutral-400 hover:scale-105'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                      
                      {/* Sizing Kit Checkbox */}
                      <div className="flex items-start gap-3 mb-3">
                        <input 
                          type="checkbox" 
                          id={`sizing-kit-${idx}`}
                          checked={includeSizingKit}
                          onChange={(e) => setIncludeSizingKit(e.target.checked)}
                          className="mt-1 w-4 h-4 rounded border-neutral-300 text-blue-600 focus:ring-blue-400"
                        />
                        <label htmlFor={`sizing-kit-${idx}`} className="text-sm text-neutral-700">
                          Include free physical sizing kit with my order
                        </label>
                      </div>
                      
                      {/* How Does It Work Link */}
                      <button
                        onClick={() => setShowSizingModal(true)}
                        className="text-sm text-blue-600 hover:text-blue-700 underline font-medium"
                      >
                        How does it work?
                      </button>
                      
                      {/* Sizing Information */}
                      <div className="bg-amber-50/50 border border-amber-200/50 rounded-xl p-3 mt-3">
                        <p className="text-xs text-neutral-700 leading-relaxed">
                          Sizing is permanent after purchase. Please use an official HUX Ring Sizing Kit for accurate measurement.
                        </p>
                      </div>
                    </div>

                    {/* Quantity and Price */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(idx, -1)}
                          className="w-8 h-8 rounded-lg border border-neutral-300 bg-white hover:bg-neutral-50 flex items-center justify-center transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center font-semibold text-neutral-900">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(idx, 1)}
                          className="w-8 h-8 rounded-lg border border-neutral-300 bg-white hover:bg-neutral-50 flex items-center justify-center transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <p className="text-lg font-bold text-neutral-900">₹{(item.product.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="backdrop-blur-xl bg-white/70 rounded-2xl p-6 border border-neutral-200/50 shadow-lg sticky top-24">
              <h2 className="text-xl font-bold text-neutral-900 mb-6">ORDER DETAILS</h2>
              
              {/* Cart Items Details */}
              <div className="space-y-4 mb-6 pb-6 border-b border-neutral-200">
                {cart.map((item, idx) => (
                  <div key={idx}>
                    <p className="font-semibold text-neutral-900 mb-1">{item.product.name}</p>
                    <p className="text-sm text-neutral-600">Color: {item.color}</p>
                    <p className="text-sm text-neutral-600">Size: {item.size}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-neutral-600">MRP:</span>
                      <span className="font-semibold text-neutral-900">₹{(item.product.price * item.quantity).toLocaleString()}</span>
                    </div>
                  </div>
                ))}
                
                {includeSizingKit && (
                  <div className="flex justify-between items-center pt-3 border-t border-neutral-200">
                    <span className="text-sm text-neutral-700">Physical Sizing Kit</span>
                    <span className="text-sm font-semibold text-green-600">Free</span>
                  </div>
                )}
              </div>
              
              {/* Subtotal */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-neutral-600">Sub-total</span>
                <span className="font-semibold text-neutral-900">₹{subtotal.toLocaleString()}</span>
              </div>
              
              {/* Shipping Charges */}
              <div className="mb-6 pb-6 border-b border-neutral-200">
                <p className="text-sm font-semibold text-neutral-700 mb-3">SHIPPING CHARGES:</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-neutral-600">Delivery Charges</span>
                    <div className="flex items-center gap-2">
                      <span className="text-neutral-400 line-through text-xs">₹6,000</span>
                      <span className="text-green-600 font-semibold">Free</span>
                    </div>
                  </div>
                  {includeSizingKit && (
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-neutral-600">Physical Sizing Kit</span>
                      <div className="flex items-center gap-2">
                        <span className="text-neutral-400 line-through text-xs">₹4,400</span>
                        <span className="text-green-600 font-semibold">Free</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-bold text-neutral-900">Total</span>
                <span className="text-2xl font-bold text-neutral-900">₹{subtotal.toLocaleString()}</span>
              </div>

              {/* Terms & Conditions */}
              <div className="flex items-start gap-3 mb-6">
                <input 
                  type="checkbox" 
                  id="terms"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-400"
                />
                <label htmlFor="terms" className="text-xs text-neutral-600 leading-relaxed">
                  I agree to the{' '}
                  <button 
                    type="button"
                    onClick={() => window.open('/terms-and-conditions', '_blank')}
                    className="text-blue-600 hover:text-blue-700 underline"
                  >
                    Terms & Conditions
                  </button>
                  {' '}and{' '}
                  <button 
                    type="button"
                    onClick={() => window.open('/privacy-policy', '_blank')}
                    className="text-blue-600 hover:text-blue-700 underline"
                  >
                    Privacy Policy
                  </button>
                </label>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                disabled={!termsAccepted}
                className="w-full bg-neutral-900 text-white py-4 rounded-xl font-semibold hover:bg-neutral-800 transition-colors shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Proceed to Checkout
              </button>

              {/* Feature Icons */}
              <div className="flex items-center justify-between py-6 border-y border-neutral-200 mt-6">
                <div className="text-center flex-1">
                  <Activity className="mx-auto mb-2 text-neutral-600" size={20} />
                  <p className="text-xs text-neutral-600 font-medium">Sustainable<br/>Materials</p>
                </div>
                <div className="text-center flex-1">
                  <ShieldCheck className="mx-auto mb-2 text-neutral-600" size={20} />
                  <p className="text-xs text-neutral-600 font-medium">6 Months<br/>Warranty</p>
                </div>
                <div className="text-center flex-1">
                  <Truck className="mx-auto mb-2 text-neutral-600" size={20} />
                  <p className="text-xs text-neutral-600 font-medium">Free Domestic<br/>Shipping</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sizing Guide Modal */}
      {showSizingModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-white/95 to-neutral-50/95 backdrop-blur-xl rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-neutral-200/50 shadow-2xl">
            <div className="sticky top-0 bg-white/80 backdrop-blur-xl border-b border-neutral-200/50 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-neutral-900">How Does It Work?</h2>
              <button
                onClick={() => setShowSizingModal(false)}
                className="p-2 hover:bg-neutral-100 rounded-lg transition-colors text-neutral-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-4">
                <p className="text-sm text-neutral-800 font-medium">
                  📏 Follow these steps to find your perfect ring size
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { step: 1, title: 'Wrap a string around your finger', desc: 'Use a thin string or paper strip and wrap it around the base of your finger.' },
                  { step: 2, title: 'Mark the overlap point', desc: 'Mark where the string overlaps with a pen.' },
                  { step: 3, title: 'Measure the length', desc: 'Lay the string flat and measure the length in millimeters.' },
                  { step: 4, title: 'Find your size', desc: 'Use the chart below to match your measurement to a ring size.' }
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-white flex items-center justify-center font-bold text-sm shadow-md">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-bold mb-1 text-neutral-900">{item.title}</h3>
                      <p className="text-sm text-neutral-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Size Chart */}
              <div className="border border-neutral-200 rounded-xl overflow-hidden bg-white/50">
                <table className="w-full text-sm">
                  <thead className="bg-neutral-100/80">
                    <tr>
                      <th className="p-3 text-left font-bold text-neutral-900">Size</th>
                      <th className="p-3 text-left font-bold text-neutral-900">Circumference (mm)</th>
                      <th className="p-3 text-left font-bold text-neutral-900">Diameter (mm)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { size: 6, circ: '51.9', dia: '16.5' },
                      { size: 7, circ: '54.4', dia: '17.3' },
                      { size: 8, circ: '57.0', dia: '18.2' },
                      { size: 9, circ: '59.5', dia: '19.0' },
                      { size: 10, circ: '62.1', dia: '19.8' },
                      { size: 11, circ: '64.6', dia: '20.6' },
                      { size: 12, circ: '67.2', dia: '21.4' },
                      { size: 13, circ: '69.7', dia: '22.2' }
                    ].map((row) => (
                      <tr key={row.size} className="border-t border-neutral-200/50 hover:bg-neutral-50/50">
                        <td className="p-3 font-bold text-blue-600">{row.size}</td>
                        <td className="p-3 text-neutral-700">{row.circ}</td>
                        <td className="p-3 text-neutral-700">{row.dia}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <button
                onClick={() => setShowSizingModal(false)}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600 py-3 rounded-xl font-bold shadow-lg transition-all"
              >
                Got it, let me select my size
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
