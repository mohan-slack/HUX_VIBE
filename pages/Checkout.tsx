
import React, { useState, useEffect } from 'react';
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
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'COD'>('UPI');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [includeSizingKit, setIncludeSizingKit] = useState(false);
  
  // Check if this is a pre-launch booking
  const isPreLaunchBooking = cart.some(item => item.product.id === 'prelaunch-hux-ring');
  const prelaunchBookingData = isPreLaunchBooking ? JSON.parse(localStorage.getItem('prelaunchBooking') || '{}') : null;

  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const total = subtotal;
  
  // Pre-populate form if pre-launch booking data exists
  useEffect(() => {
    const bookingData = JSON.parse(localStorage.getItem('prelaunchBooking') || '{}');
    if (bookingData.firstName) {
      setFirstName(bookingData.firstName || '');
      setLastName(bookingData.lastName || '');
      setAddress(prev => ({
        ...prev,
        email: bookingData.email || '',
        phone: bookingData.phone?.replace(/\D/g, '') || ''
      }));
    }
  }, []);

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

  const handlePayment = async () => {
    setLoading(true);
    setErrorMessage(null);
    
    try {
      const fullAddr = { ...address, fullName: `${firstName} ${lastName}` };
      
      // Store address for pre-launch tracking
      localStorage.setItem('checkoutAddress', JSON.stringify(fullAddr));
      
      // 1. Create Order (works for both regular and pre-launch)
      const orderData = await placeRazorpayOrder(fullAddr, address.email);
      
      // 2. Load SDK
      const isLoaded = await loadRazorpay();
      if (!isLoaded) {
        setErrorMessage("Razorpay SDK failed to load. Please check your internet connection.");
        setLoading(false);
        return;
      }

      // 3. Open Razorpay with selected payment method
      console.log('Razorpay order data:', orderData);
      
      const options: any = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "HUX Technologies",
        description: "HUX Smart Ring Order",
        order_id: orderData.razorpayOrderId,
        handler: async function (response: any) {
          try {
            const orderId = await verifyPayment(response);
            navigate(`/success/${orderId}`);
          } catch (err: any) {
            console.error(err);
            setErrorMessage(`Payment Verification Failed: ${err.message}`);
          }
        },
        prefill: {
          name: fullAddr.fullName,
          email: address.email,
          contact: `+91${address.phone}`,
        },
        theme: {
          color: "#02b3d9", // HUX Turquoise
        },
        modal: {
            ondismiss: function() {
                setLoading(false);
            }
        }
      };

      // Pre-select payment method based on user choice
      if (paymentMethod === 'UPI') {
        options.method = 'upi';
      } else if (paymentMethod === 'Card') {
        options.method = 'card';
      } else if (paymentMethod === 'COD') {
        options.method = 'cod';
      }

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (response: any){
        setErrorMessage(response.error?.description || 'Payment failed. Please try again.');
        setLoading(false);
      });
      
      // Add error handling for Razorpay initialization
      try {
        rzp.open();
      } catch (rzpError: any) {
        console.error('Razorpay open error:', rzpError);
        setErrorMessage('Unable to open payment gateway. Please refresh and try again.');
        setLoading(false);
      }
    } catch (error: any) {
      console.error(error);
      // Handle errors normally
      setErrorMessage(error.message || "Error initiating payment. Please try again.");
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
    <div className="min-h-screen bg-gradient-to-br from-[#f8f6f3] via-[#faf9f7] to-[#f5f3f0] text-neutral-900 font-sans selection:bg-neutral-200 selection:text-neutral-900 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-100/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-neutral-200/20 to-transparent rounded-full blur-3xl"></div>
      
      {/* Header */}
      <header className="border-b border-neutral-200/50 py-6 px-6 lg:px-12 flex justify-between items-center bg-white/60 sticky top-0 z-50 backdrop-blur-md">
        <div className="flex items-center gap-3 text-neutral-900">
          <Flower className="text-hux-turquoise fill-hux-turquoise" size={24} />
          <button onClick={() => navigate('/')} className="text-2xl font-display font-bold tracking-tight hover:text-hux-turquoise transition-colors">HUX</button>
        </div>
        <div className="flex items-center gap-2 text-neutral-600 text-sm font-medium bg-green-50 px-3 py-1.5 rounded-full border border-green-200">
          <Lock size={12} className="text-green-600" />
          <span>Secure Checkout</span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8 lg:py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        {/* Left Column - Forms */}
        <div className="lg:col-span-7 space-y-8">
           {/* Breadcrumbs */}
           <nav className="flex items-center gap-3 text-sm font-medium">
             <button onClick={() => navigate('/')} className="text-hux-turquoise hover:underline font-bold">Cart</button>
             <ChevronRight size={14} className="text-neutral-400"/>
             <span className={`${step === 1 ? 'text-neutral-900 font-bold' : 'text-hux-turquoise cursor-pointer hover:underline'}`} onClick={() => step === 2 && setStep(1)}>Information</span>
             <ChevronRight size={14} className="text-neutral-400"/>
             <span className={`${step === 2 ? 'text-neutral-900 font-bold' : 'text-neutral-500'}`}>Payment</span>
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
                      className="w-full bg-white/80 border border-neutral-200 rounded-xl pl-12 pr-4 py-4 text-neutral-900 placeholder:text-neutral-400 focus:border-hux-turquoise outline-none transition-all duration-300 hover:border-neutral-300 shadow-sm" 
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
                        <input required type="text" placeholder="First Name" className="w-full bg-white/80 border border-neutral-200 rounded-xl pl-12 pr-4 py-4 text-neutral-900 placeholder:text-neutral-400 focus:border-hux-turquoise outline-none transition-all hover:border-neutral-300 shadow-sm" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                      </div>
                      <div className="group relative">
                        <input 
                          required 
                          type="text" 
                          placeholder="Last Name" 
                          className="w-full bg-white/80 border border-neutral-200 rounded-xl px-4 py-4 text-neutral-900 placeholder:text-neutral-400 focus:border-hux-turquoise outline-none transition-all hover:border-neutral-300 shadow-sm" 
                          value={lastName} 
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>
                  </div>

                  <input required type="text" placeholder="Apartment, suite, etc." className="w-full bg-white/80 border border-neutral-200 rounded-xl px-4 py-4 text-neutral-900 placeholder:text-neutral-400 focus:border-hux-turquoise outline-none transition-all hover:border-neutral-300 shadow-sm" value={address.street} onChange={(e) => setAddress({...address, street: e.target.value})} />

                  <div className="grid grid-cols-2 gap-4">
                      <input required type="text" placeholder="City" className="w-full bg-white/80 border border-neutral-200 rounded-xl px-4 py-4 text-neutral-900 placeholder:text-neutral-400 focus:border-hux-turquoise outline-none transition-all hover:border-neutral-300 shadow-sm" value={address.city} onChange={(e) => setAddress({...address, city: e.target.value})} />
                      
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
                          className="w-full bg-white/80 border border-neutral-200 rounded-xl pl-12 pr-4 py-4 text-neutral-900 placeholder:text-neutral-400 focus:border-hux-turquoise outline-none transition-all hover:border-neutral-300 shadow-sm" 
                          value={address.zipCode} 
                          onChange={handlePinChange} 
                        />
                      </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                      <input required type="text" placeholder="State" className="w-full bg-white/80 border border-neutral-200 rounded-xl px-4 py-4 text-neutral-900 placeholder:text-neutral-400 focus:border-hux-turquoise outline-none transition-all hover:border-neutral-300 shadow-sm" value={address.state} onChange={(e) => setAddress({...address, state: e.target.value})} />
                      
                      {/* Phone - India Default + Numeric Only */}
                      <div className="group relative">
                        <div className="flex items-center bg-white/80 border border-neutral-200 rounded-xl overflow-hidden focus-within:border-hux-turquoise transition-all hover:border-neutral-300 shadow-sm">
                           <div className="bg-neutral-100 px-3 py-4 flex items-center gap-2 border-r border-neutral-200">
                              <img src="https://flagcdn.com/w20/in.png" alt="India" className="w-5 rounded-sm" />
                              <span className="text-neutral-700 font-medium text-sm">+91</span>
                           </div>
                           <input 
                              required 
                              type="tel" 
                              maxLength={10}
                              placeholder="Mobile Number" 
                              className="w-full bg-transparent p-4 text-neutral-900 placeholder:text-neutral-400 outline-none font-medium tracking-wide" 
                              value={address.phone} 
                              onChange={handlePhoneChange} 
                            />
                        </div>
                      </div>
                  </div>
               </section>

               <div className="flex flex-col-reverse sm:flex-row sm:justify-between items-center gap-6 pt-6">
                  <button type="button" onClick={() => navigate('/bag')} className="text-hux-turquoise text-sm flex items-center gap-1 hover:text-neutral-900 transition-colors font-semibold"><ChevronLeft size={14} /> Return to Cart</button>
                  <Button type="submit" className="w-full sm:w-auto bg-neutral-900 text-white hover:bg-neutral-800 px-10 py-4 rounded-xl font-bold text-sm shadow-lg">Continue to Payment</Button>
               </div>
            </form>
          ) : (
            <div className="animate-fadeIn space-y-8">
               {/* Information Review Card */}
               <div className="bg-white/80 backdrop-blur-xl border border-neutral-200/50 rounded-2xl p-6 text-sm space-y-4 shadow-lg">
                  <div className="flex justify-between items-start border-b border-neutral-200 pb-4">
                    <div className="space-y-1">
                        <span className="block text-neutral-500 text-xs uppercase tracking-wider">Contact</span>
                        <span className="block text-neutral-900 font-medium">{address.email}</span>
                        <span className="block text-neutral-600">+91 {address.phone}</span>
                    </div>
                    <button onClick={() => setStep(1)} className="text-hux-turquoise hover:text-neutral-900 text-xs font-bold underline">Edit</button>
                  </div>
                  <div className="flex justify-between items-start border-b border-neutral-200 pb-4">
                    <div className="space-y-1">
                        <span className="block text-neutral-500 text-xs uppercase tracking-wider">Ship To</span>
                        <span className="block text-neutral-900 font-medium">{address.street}</span>
                        <span className="block text-neutral-600">{address.city}, {address.state} - {address.zipCode}</span>
                    </div>
                    <button onClick={() => setStep(1)} className="text-hux-turquoise hover:text-neutral-900 text-xs font-bold underline">Edit</button>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                         <span className="block text-neutral-500 text-xs uppercase tracking-wider">Method</span>
                         <div className="flex items-center gap-2">
                            <Truck size={14} className="text-hux-turquoise"/>
                            <span className="text-neutral-900 font-medium">Standard Express</span>
                         </div>
                    </div>
                    <span className="text-neutral-900 font-bold">Free</span>
                  </div>
               </div>

               {/* Payment Method Selection */}
               <section>
                 <h2 className="text-lg font-bold mb-4 font-display">Payment Method</h2>
                 <div className="space-y-3">
                    {[
                        { id: 'UPI', label: 'UPI / GPay / PhonePe', icon: <ShieldCheck size={20}/>, desc: "Instant & Secure" },
                        { id: 'Card', label: 'Credit / Debit Card', icon: <CreditCard size={20}/>, desc: "Visa, Mastercard, Amex" },
                        { id: 'COD', label: 'Cash on Delivery', icon: <Truck size={20}/>, desc: "Pay upon arrival" }
                    ].map((method) => (
                        <div 
                          key={method.id}
                          onClick={() => setPaymentMethod(method.id as any)}
                          className={`p-5 border rounded-2xl cursor-pointer flex items-center justify-between transition-all duration-300 group ${paymentMethod === method.id ? 'border-hux-turquoise bg-blue-50/50 shadow-lg' : 'border-neutral-200 bg-white/80 hover:border-neutral-300'}`}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-xl transition-colors ${paymentMethod === method.id ? 'bg-hux-turquoise text-white' : 'bg-neutral-100 text-neutral-600 group-hover:text-neutral-900'}`}>
                              {method.icon}
                            </div>
                            <div>
                                <span className={`block font-bold text-sm ${paymentMethod === method.id ? 'text-neutral-900' : 'text-neutral-700'}`}>{method.label}</span>
                                <span className="text-xs text-neutral-500">{method.desc}</span>
                            </div>
                          </div>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${paymentMethod === method.id ? 'border-hux-turquoise' : 'border-neutral-400'}`}>
                            {paymentMethod === method.id && <div className="w-2.5 h-2.5 bg-hux-turquoise rounded-full shadow-sm"></div>}
                          </div>
                        </div>
                    ))}
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
                  <button type="button" onClick={() => setStep(1)} className="text-hux-turquoise text-sm flex items-center gap-1 hover:text-neutral-900 transition-colors font-semibold"><ChevronLeft size={14} /> Back to Shipping</button>
                  <Button onClick={handlePayment} disabled={loading} className="w-full sm:w-auto bg-neutral-900 text-white hover:bg-neutral-800 px-10 py-4 rounded-xl font-bold text-sm shadow-lg">
                    {loading ? 'Processing...' : isPreLaunchBooking ? `Book Now - ₹${total.toLocaleString()}` : `Pay ₹${total.toLocaleString()}`}
                  </Button>
               </div>
            </div>
          )}
        </div>

        {/* Right Column - Summary */}
        <div className="lg:col-span-5 h-fit sticky top-28">
           <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-neutral-200/50 shadow-2xl relative overflow-hidden">
              {/* Decorative top gradient */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-hux-turquoise to-transparent opacity-50"></div>

              <h3 className="text-xl font-bold text-neutral-900 mb-6">{isPreLaunchBooking ? 'PRE-LAUNCH BOOKING' : 'ORDER DETAILS'}</h3>
              
              {isPreLaunchBooking && (
                <div className="bg-gradient-to-r from-hux-turquoise/10 to-hux-gold/10 rounded-xl p-4 mb-6 border border-hux-turquoise/20">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-hux-turquoise rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-hux-turquoise">PRE-LAUNCH SPECIAL</span>
                  </div>
                  <p className="text-xs text-hux-dark/70 mb-2">You're booking the first batch of HUX Smart Rings</p>
                  <div className="text-xs space-y-1">
                    <div className="flex justify-between">
                      <span>Booking Amount (Now):</span>
                      <span className="font-semibold">₹2,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Remaining (At Shipping):</span>
                      <span className="font-semibold">₹8,000</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>Total Savings:</span>
                      <span className="font-semibold">₹7,999</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Cart Items Details */}
              <div className="space-y-4 mb-6 pb-6 border-b border-neutral-200">
                {cart.map((item, idx) => (
                  <div key={idx}>
                    <p className="font-semibold text-neutral-900 mb-1">{item.product.name}</p>
                    <p className="text-sm text-neutral-600">Color: {item.color}</p>
                    <p className="text-sm text-neutral-600">Size: {item.size}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-neutral-600">{isPreLaunchBooking ? 'Booking Amount:' : 'MRP:'}</span>
                      <span className="font-semibold text-neutral-900">₹{(item.product.price * item.quantity).toLocaleString()}</span>
                    </div>
                  </div>
                ))}
                
                {(includeSizingKit || isPreLaunchBooking) && (
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
                <span className="text-lg font-bold text-neutral-900">{isPreLaunchBooking ? 'Booking Amount' : 'Total'}</span>
                <span className="text-2xl font-bold text-neutral-900">₹{total.toLocaleString()}</span>
              </div>
              
              {isPreLaunchBooking && (
                <div className="bg-hux-turquoise/5 rounded-xl p-4 mb-4">
                  <h4 className="text-sm font-semibold text-hux-dark mb-2">What happens next?</h4>
                  <ul className="text-xs text-hux-dark/70 space-y-1">
                    <li>• Confirmation email with booking details</li>
                    <li>• Free sizing kit shipped within 3 days</li>
                    <li>• Production updates every 10-15 days</li>
                    <li>• Final payment request after 60 working days</li>
                    <li>• Delivery within 7 days of final payment</li>
                  </ul>
                </div>
              )}
           </div>
           
           <div className="mt-6 text-center text-xs text-neutral-600 flex items-center justify-center gap-2">
             <Lock size={12} className="text-green-600" />
             <span>Guaranteed Safe & Secure Checkout</span>
           </div>
        </div>
      </main>
    </div>
  );
};
