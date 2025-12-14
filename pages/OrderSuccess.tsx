import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Check, ChevronDown, ChevronUp, Package, MapPin, Mail, Phone, CreditCard } from 'lucide-react';
import { Button } from '../components/Button';
import { supabase } from '../src/lib/supabaseClient';

export const OrderSuccess = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [orderData, setOrderData] = useState<any>(null);
  const [orderItems, setOrderItems] = useState<any[]>([]);
  const [showSummary, setShowSummary] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Check if this was a pre-launch booking
  const prelaunchBookingData = JSON.parse(localStorage.getItem('prelaunchBooking') || '{}');
  const isPreLaunchBooking = Object.keys(prelaunchBookingData).length > 0;
  
  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!id) return;
      
      try {
        // Fetch order details
        const { data: order } = await supabase
          .from('orders')
          .select('*')
          .eq('tracking_number', id)
          .single();
        
        if (order) {
          setOrderData(order);
          
          // Fetch order items
          const { data: items } = await supabase
            .from('order_items')
            .select('*, products(*)')
            .eq('order_id', order.id);
          
          setOrderItems(items || []);
        }
      } catch (error) {
        console.error('Error fetching order details:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrderDetails();
  }, [id]);
  
  // Clear pre-launch booking data after successful order
  useEffect(() => {
    if (isPreLaunchBooking) {
      setTimeout(() => {
        localStorage.removeItem('prelaunchBooking');
      }, 5000);
    }
  }, [isPreLaunchBooking]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8f6f3] via-[#faf9f7] to-[#f5f3f0]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hux-turquoise"></div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const calculateTax = (amount: number) => {
    return Math.round(amount * 0.18 * 100) / 100; // 18% GST
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f6f3] via-[#faf9f7] to-[#f5f3f0] py-8 px-4 selection:bg-neutral-800 selection:text-white pt-20">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
            <Check size={32} strokeWidth={3} />
          </div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            {isPreLaunchBooking ? 'Booking Confirmed!' : 'Order Confirmed!'}
          </h1>
          <p className="text-neutral-600">Thank you for your purchase</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-neutral-200/50">
              {/* Collapsible Order Summary */}
              <button
                onClick={() => setShowSummary(!showSummary)}
                className="w-full flex items-center justify-between mb-4 text-left"
              >
                <span className="text-lg font-semibold text-neutral-900">
                  {showSummary ? 'Hide' : 'Show'} order summary
                </span>
                {showSummary ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              <div className="text-2xl font-bold text-neutral-900 mb-4">
                ₹{orderData?.total_amount?.toLocaleString()}
              </div>
              
              {showSummary && (
                <div className="space-y-4 animate-fadeIn">
                  <h3 className="font-semibold text-neutral-900">Order items</h3>
                  
                  {orderItems.map((item, idx) => {
                    const getProductImage = (color: string) => {
                      if (color === 'Sterling Gold') return '/images/productImages/goldImages/gold01.png';
                      if (color === 'Tarnish Grey') return '/images/productImages/tarnishImages/tarnish01.png';
                      return '/images/productImages/goldImages/gold01.png';
                    };
                    
                    return (
                      <div key={idx} className="flex items-start gap-3 pb-4 border-b border-neutral-200 last:border-b-0">
                        <div className="w-12 h-12 bg-neutral-100 rounded-lg overflow-hidden">
                          <img 
                            src={getProductImage(item.color)} 
                            alt={item.color}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-neutral-900">{item.products?.name || 'HUX Smart Ring'}</h4>
                          <p className="text-sm text-neutral-600">{item.color}</p>
                          <p className="text-sm text-neutral-600">Size: {item.size}</p>
                          <p className="text-sm text-neutral-600">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-neutral-900">₹{(item.price_at_purchase * item.quantity).toLocaleString()}</p>
                        </div>
                      </div>
                    );
                  })}
                  
                  {/* Order Totals */}
                  <div className="space-y-2 pt-4 border-t border-neutral-200">
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-600">Subtotal</span>
                      <span className="text-neutral-900">₹{orderData?.total_amount?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-600">Shipping</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-600">Discount</span>
                      <span className="text-green-600">-₹{isPreLaunchBooking ? '7,999' : '0'}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg pt-2 border-t border-neutral-200">
                      <span className="text-neutral-900">Total</span>
                      <span className="text-neutral-900">₹{orderData?.total_amount?.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-neutral-500">Including ₹{calculateTax(orderData?.total_amount || 0)} in taxes</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Info */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-neutral-200/50">
              <div className="flex items-center gap-3 mb-4">
                <Package className="text-hux-turquoise" size={24} />
                <div>
                  <h2 className="text-xl font-bold text-neutral-900">Order #{id}</h2>
                  <p className="text-neutral-600">Confirmed {orderData?.created_at ? formatDate(orderData.created_at) : ''}</p>
                </div>
              </div>
              
              <div className="bg-green-50 rounded-xl p-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-semibold text-green-800">Fulfillment status: {orderData?.status || 'Confirmed'}</span>
                </div>
                <p className="text-green-700 text-sm mt-1">
                  Confirmed {orderData?.created_at ? formatDate(orderData.created_at) : ''}
                </p>
              </div>
              
              {isPreLaunchBooking && (
                <div className="bg-hux-turquoise/10 rounded-xl p-4">
                  <h3 className="font-semibold text-hux-turquoise mb-2">Pre-Launch Timeline</h3>
                  <ul className="text-sm text-neutral-700 space-y-1">
                    <li>• Sizing kit ships within 3 days</li>
                    <li>• Production updates every 10-15 days</li>
                    <li>• Final payment in 60 working days</li>
                    <li>• Priority delivery to your address</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Order Details */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-neutral-200/50">
              <h3 className="text-lg font-bold text-neutral-900 mb-6">Order details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Contact Information */}
                <div>
                  <h4 className="font-semibold text-neutral-900 mb-3 flex items-center gap-2">
                    <Mail size={18} className="text-hux-turquoise" />
                    Contact information
                  </h4>
                  <div className="text-neutral-700 space-y-1">
                    <p>{orderData?.guest_email}</p>
                    <p className="flex items-center gap-1">
                      <Phone size={14} />
                      +91 {orderData?.shipping_address?.phone}
                    </p>
                  </div>
                </div>
                
                {/* Shipping Address */}
                <div>
                  <h4 className="font-semibold text-neutral-900 mb-3 flex items-center gap-2">
                    <MapPin size={18} className="text-hux-turquoise" />
                    Shipping address
                  </h4>
                  {orderData?.shipping_address && (
                    <div className="text-neutral-700 text-sm space-y-1">
                      <p className="font-medium">{orderData.shipping_address.fullName}</p>
                      <p>{orderData.shipping_address.street}</p>
                      <p>{orderData.shipping_address.city}, {orderData.shipping_address.state}</p>
                      <p>{orderData.shipping_address.zipCode}</p>
                    </div>
                  )}
                </div>
                
                {/* Shipping Method */}
                <div>
                  <h4 className="font-semibold text-neutral-900 mb-3 flex items-center gap-2">
                    <Package size={18} className="text-hux-turquoise" />
                    Shipping method
                  </h4>
                  <p className="text-neutral-700">Express (Prepaid)</p>
                </div>
                
                {/* Billing Address */}
                <div>
                  <h4 className="font-semibold text-neutral-900 mb-3 flex items-center gap-2">
                    <CreditCard size={18} className="text-hux-turquoise" />
                    Billing address
                  </h4>
                  <p className="text-neutral-700 text-sm">Same as shipping address</p>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => navigate('/track')} 
                className="bg-hux-turquoise text-white hover:bg-hux-turquoise/90 px-6 py-3 rounded-xl font-semibold"
              >
                Track Your Order
              </Button>
              <Button 
                onClick={() => navigate('/')} 
                variant="outline"
                className="border-neutral-300 text-neutral-700 hover:bg-neutral-50 px-6 py-3 rounded-xl font-semibold"
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};