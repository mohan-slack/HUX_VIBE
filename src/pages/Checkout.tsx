
import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Address } from '../types';
import { Button } from '../components/Button';
import { Check, CreditCard, ShieldCheck, ChevronLeft, Truck, Lock, ChevronRight, ChevronDown, Flower, MapPin, User, Mail, AlertCircle, Ruler } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

// Helper to load Razorpay script
const loadRazorpay = () => {
  return new Promise((resolve) => {
    if ((window as any).Razorpay) {
        resolve(true);
        return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const Checkout = () => {
  const { cart, placeRazorpayOrder, verifyPayment, updateSize } = useShop();
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState<Address>({
    fullName: '', street: '', city: '', state: '', zipCode: '', phone: '', email: ''
  });
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card'>('UPI');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const total = subtotal;

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (address.phone.length !== 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (address.zipCode.length !== 6) {
      alert("Please enter a valid 6-digit PIN code.");
      return;
    }
    setStep(2);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setAddress({ ...address, phone: value });
  };

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setAddress({ ...address, zipCode: value });
  };

  const handleRazorpayPayment = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const fullAddr = { ...address, fullName: `${firstName} ${lastName}` };
      const email = address.email;
      const data = await placeRazorpayOrder(fullAddr, email);

      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        order_id: data.razorpayOrderId,
        handler: async function (response: any) {
          try {
            await verifyPayment(response);
            navigate("/success");
          } catch (err: any) {
            console.error("PAYMENT ERROR:", err);
            setErrorMessage(err?.message || "Payment failed. Please try again.");
          }
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err: any) {
      console.error("PAYMENT ERROR:", err);
      setErrorMessage(err?.message || "Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getColorHex = (color: string) => {
    switch(color) {
      case 'Tarnish Grey': return '#6B7280';
      case 'Sterling Gold': return '#EAB308';
      case 'Lunar Rose': return '#FDA4AF';
      default: return '#E5E7EB';
    }
  };

  if (cart.length === 0 && step === 1) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-3xl font-display font-bold mb-4">Your Bag is Empty</h2>
        <Button onClick={() => navigate('/')} className="bg-hux-gold text-black hover:bg-yellow-400 px-8 py-3 rounded-lg font-bold">Explore Collection</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-hux-gold selection:text-black">
      {/* Header */}
      <header className="border-b border-white/5 py-6 px-6 lg:px-12 flex justify-between items-center bg-[#0a0a0a] sticky top-0 z-50 backdrop-blur-md bg-opacity-80">
        <div className="flex items-center gap-3 text-white">
          <Flower className="text-hux-gold fill-hux-gold" size={24} />
          <button onClick={() => navigate('/')} className="text-2xl font-display font-bold tracking-tight hover:text-hux-gold transition-colors">HUX</button>
        </div>
        <div className="flex items-center gap-2 text-neutral-400 text-sm font-medium bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
          <Lock size={12} className="text-hux-gold" />
          <span>Secure Checkout</span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8 lg:py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column - Forms */}
        <div className="lg:col-span-7 space-y-8">
           {/* Breadcrumbs */}
           <nav className="flex items-center gap-3 text-sm font-medium">
             <button onClick={() => navigate('/')} className="text-hux-gold hover:underline font-bold">Cart</button>
             <ChevronRight size={14} className="text-neutral-600"/>
             <span className={`${step === 1 ? 'text-white font-bold' : 'text-hux-gold cursor-pointer hover:underline'}`} onClick={() => step === 2 && setStep(1)}>Information</span>
             <ChevronRight size={14} className="text-neutral-600"/>
             <span className={`${step === 2 ? 'text-white font-bold' : 'text-neutral-500'}`}>Payment</span>
          </nav>

          {step === 1 ? (
            <form onSubmit={handleAddressSubmit} className="animate-fadeIn space-y-8">
               
               {/* Contact Section */}
               <section className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold font-display tracking-wide">Contact Information</h2>
                  </div>
                  <div className="group relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-hux-gold transition-colors">
                      <Mail size={18} />
                    </div>
                    <input 
                      required 
                      type="email" 
                      placeholder="Email Address" 
                      className="w-full bg-[#161616] border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder:text-neutral-600 focus:border-hux-gold outline-none transition-all duration-300 hover:border-white/20" 
                      value={address.email} 
                      onChange={(e) => setAddress({...address, email: e.target.value})} 
                    />
                  </div>
               </section>

               {/* Shipping Section */}
               <section className="space-y-4">
                  <h2 className="text-lg font-bold font-display tracking-wide">Shipping Address</h2>
                  
                  <div className="grid grid-cols-2 gap-4">
                      <div className="group relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-hux-gold transition-colors"><User size={18} /></div>
                        <input required type="text" placeholder="First Name" className="w-full bg-[#161616] border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder:text-neutral-600 focus:border-hux-gold outline-none transition-all hover:border-white/20" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                      </div>
                      <div className="group relative">
                        <input required type="text" placeholder="Last Name" className="w-full bg-[#161616] border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-neutral-600 focus:border-hux-gold outline-none transition-all hover:border-white/20" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                      </div>
                  </div>

                  <input required type="text" placeholder="Apartment, suite, etc." className="w-full bg-[#161616] border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-neutral-600 focus:border-hux-gold outline-none transition-all hover:border-white/20" value={address.street} onChange={(e) => setAddress({...address, street: e.target.value})} />

                  <div className="grid grid-cols-2 gap-4">
                      <input required type="text" placeholder="City" className="w-full bg-[#161616] border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-neutral-600 focus:border-hux-gold outline-none transition-all hover:border-white/20" value={address.city} onChange={(e) => setAddress({...address, city: e.target.value})} />
                      
                      {/* PIN Code - Numeric Only */}
                      <div className="group relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-hux-gold transition-colors">
                          <MapPin size={18} />
                        </div>
                        <input 
                          required 
                          type="text" 
                          maxLength={6}
                          placeholder="PIN Code" 
                          className="w-full bg-[#161616] border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder:text-neutral-600 focus:border-hux-gold outline-none transition-all hover:border-white/20" 
                          value={address.zipCode} 
                          onChange={handlePinChange} 
                        />
                      </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                      <input required type="text" placeholder="State" className="w-full bg-[#161616] border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-neutral-600 focus:border-hux-gold outline-none transition-all hover:border-white/20" value={address.state} onChange={(e) => setAddress({...address, state: e.target.value})} />
                      
                      {/* Phone - India Default + Numeric Only */}
                      <div className="group relative">
                        <div className="flex items-center bg-[#161616] border border-white/10 rounded-xl overflow-hidden focus-within:border-hux-gold transition-all hover:border-white/20">
                           <div className="bg-[#222] px-3 py-4 flex items-center gap-2 border-r border-white/10">
                              <img src="https://flagcdn.com/w20/in.png" alt="India" className="w-5 rounded-sm opacity-80" />
                              <span className="text-neutral-300 font-medium text-sm">+91</span>
                           </div>
                           <input 
                              required 
                              type="tel" 
                              maxLength={10}
                              placeholder="Mobile Number" 
                              className="w-full bg-transparent p-4 text-white placeholder:text-neutral-600 outline-none font-medium tracking-wide" 
                              value={address.phone} 
                              onChange={handlePhoneChange} 
                            />
                        </div>
                      </div>
                  </div>
               </section>

               <div className="flex flex-col-reverse sm:flex-row sm:justify-between items-center gap-6 pt-6">
                  <button type="button" onClick={() => navigate('/')} className="text-hux-gold text-sm flex items-center gap-1 hover:text-white transition-colors"><ChevronLeft size={14} /> Return to Cart</button>
                  <Button type="submit" className="w-full sm:w-auto bg-hux-gold text-black hover:bg-yellow-400 px-10 py-4 rounded-xl font-bold text-sm shadow-[0_4px_20px_rgba(212,175,55,0.2)]">Continue to Payment</Button>
               </div>
            </form>
          ) : (
            <div className="animate-fadeIn space-y-8">
               {/* Information Review Card */}
               <div className="bg-[#161616] border border-white/5 rounded-2xl p-6 text-sm space-y-4">
                  <div className="flex justify-between items-start border-b border-white/5 pb-4">
                    <div className="space-y-1">
                        <span className="block text-neutral-400 text-xs uppercase tracking-wider">Contact</span>
                        <span className="block text-white font-medium">{address.email}</span>
                        <span className="block text-neutral-400">+91 {address.phone}</span>
                    </div>
                    <button onClick={() => setStep(1)} className="text-hux-gold hover:text-white text-xs font-bold underline">Edit</button>
                  </div>
                  <div className="flex justify-between items-start border-b border-white/5 pb-4">
                    <div className="space-y-1">
                        <span className="block text-neutral-400 text-xs uppercase tracking-wider">Ship To</span>
                        <span className="block text-white font-medium">{address.street}</span>
                        <span className="block text-neutral-400">{address.city}, {address.state} - {address.zipCode}</span>
                    </div>
                    <button onClick={() => setStep(1)} className="text-hux-gold hover:text-white text-xs font-bold underline">Edit</button>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                         <span className="block text-neutral-400 text-xs uppercase tracking-wider">Method</span>
                         <div className="flex items-center gap-2">
                            <Truck size={14} className="text-hux-gold"/>
                            <span className="text-white font-medium">Standard Express</span>
                         </div>
                    </div>
                    <span className="text-white font-bold">Free</span>
                  </div>
               </div>

               {/* Payment Method Selection */}
               <section>
                 <h2 className="text-lg font-bold mb-4 font-display">Payment Method</h2>
                 <div className="space-y-3">
                    <div 
                      className="p-5 border rounded-2xl flex items-center justify-between transition-all duration-300 border-hux-gold bg-hux-gold/5 shadow-[0_0_20px_rgba(212,175,55,0.05)]"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-hux-gold text-black">
                          <ShieldCheck size={20}/>
                        </div>
                        <div>
                            <span className="block font-bold text-sm text-white">UPI / GPay / PhonePe</span>
                            <span className="text-xs text-neutral-500">Instant & Secure</span>
                        </div>
                      </div>
                      <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors border-hux-gold">
                        <div className="w-2.5 h-2.5 bg-hux-gold rounded-full shadow-sm"></div>
                      </div>
                    </div>
                 </div>
               </section>
               
               {/* Error Display */}
               {errorMessage && (
                 <div className="bg-red-900/10 border border-red-500/20 rounded-xl p-4 flex items-start gap-3 animate-fadeIn backdrop-blur-sm">
                    <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={18} />
                    <div className="text-sm text-red-200">
                      <p className="font-bold mb-1">Attention Required</p>
                      <p className="opacity-80">{errorMessage}</p>
                    </div>
                 </div>
               )}

               <div className="flex flex-col-reverse sm:flex-row sm:justify-between items-center gap-6 pt-6">
                  <button type="button" onClick={() => setStep(1)} className="text-hux-gold text-sm flex items-center gap-1 hover:text-white transition-colors"><ChevronLeft size={14} /> Back to Shipping</button>
                  <Button onClick={handleRazorpayPayment} disabled={loading} className="w-full sm:w-auto bg-hux-gold text-black hover:bg-yellow-400 px-10 py-4 rounded-xl font-bold text-sm shadow-[0_4px_20px_rgba(212,175,55,0.2)]">
                    {loading ? 'Processing...' : 'Pay Now'}
                  </Button>
               </div>
            </div>
          )}
        </div>

        {/* Right Column - Summary */}
        <div className="lg:col-span-5 h-fit sticky top-28">
           <div className="bg-[#161616] rounded-3xl p-8 border border-white/5 shadow-2xl relative overflow-hidden">
              {/* Decorative top gradient */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-hux-gold to-transparent opacity-50"></div>

              <h3 className="text-lg font-bold font-display mb-6 flex items-center gap-2">
                 Order Summary 
                 <span className="text-xs bg-white/10 text-neutral-300 px-2 py-0.5 rounded-full font-sans">{cart.length}</span>
              </h3>

              <div className="space-y-6 mb-8">
                {cart.map((item, idx) => (
                   <div key={idx} className="flex gap-4">
                     <div className="relative w-16 h-16 rounded-xl border border-white/10 flex-shrink-0 overflow-hidden bg-black/50">
                        {/* Simulated Color Preview */}
                        <div className="absolute inset-0 opacity-50" style={{backgroundColor: getColorHex(item.color)}}></div>
                        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent"></div>
                     </div>
                     
                     <div className="flex-1">
                       <div className="flex justify-between items-start mb-1">
                          <p className="text-sm font-bold text-white">{item.product.name}</p>
                          <p className="text-sm font-medium text-white">₹{(item.product.price * item.quantity).toLocaleString()}</p>
                       </div>
                       <p className="text-xs text-neutral-400 mb-2">{item.color}</p>
                       
                       {/* Ring Size Selector */}
                       <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1.5 w-fit border border-white/5">
                          <Ruler size={12} className="text-neutral-500 ml-1" />
                          <span className="text-[10px] text-neutral-400 uppercase tracking-wide">Size</span>
                          <div className="h-3 w-[1px] bg-white/10"></div>
                          <select 
                             value={item.size}
                             onChange={(e) => updateSize(idx, parseInt(e.target.value))}
                             className="bg-transparent text-xs text-hux-gold font-bold outline-none cursor-pointer pr-1 appearance-none hover:text-white transition-colors"
                          >
                            {[6,7,8,9,10,11,12,13].map(s => <option key={s} value={s} className="bg-[#222] text-white">Size {s}</option>)}
                          </select>
                          <ChevronDown size={10} className="text-hux-gold" />
                       </div>
                     </div>
                   </div>
                ))}
              </div>
              
              {/* Discount Field */}
              <div className="flex gap-2 mb-8">
                  <input 
                    type="text" 
                    placeholder="Discount code" 
                    className="flex-1 bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-neutral-600 focus:border-hux-gold outline-none transition-all hover:border-white/20" 
                  />
                  <button className="bg-[#2a2a2a] text-neutral-300 px-5 rounded-xl font-bold hover:bg-hux-gold hover:text-black border border-white/5 transition-all duration-300 text-sm">
                    Apply
                  </button>
              </div>

              {/* Totals */}
              <div className="space-y-3 border-t border-white/10 pt-6 mb-6">
                 <div className="flex justify-between text-sm text-neutral-400">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between text-sm text-neutral-400">
                    <span>Shipping</span>
                    <span className="text-hux-gold font-medium">Free</span>
                 </div>
              </div>

              <div className="flex justify-between items-end border-t border-white/10 pt-6">
                <span className="text-lg font-bold text-neutral-200">Total</span>
                <div className="text-right">
                    <span className="text-xs text-neutral-500 block mb-1">INR</span>
                    <span className="text-3xl font-display font-bold text-white tracking-tight">₹{total.toLocaleString()}</span>
                </div>
              </div>
           </div>
           
           <div className="mt-6 text-center text-xs text-neutral-500 flex items-center justify-center gap-2 opacity-80">
             <Lock size={12} />
             <span>Guaranteed Safe & Secure Checkout</span>
           </div>
        </div>
      </main>
    </div>
  );
};
