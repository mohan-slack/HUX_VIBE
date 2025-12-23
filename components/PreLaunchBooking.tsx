import React, { useState, useCallback } from 'react';
import { Button } from './Button';
import { useShop } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';

interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  ringSize: string;
  color: string;
}

export const PreLaunchBooking: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<BookingFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    ringSize: '',
    color: 'Tarnish Grey'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToCart } = useShop();
  const navigate = useNavigate();

  const ringSizes = [6, 7, 8, 9, 10, 11, 12, 13];
  const colors = ['Tarnish Grey', 'Sterling Gold'];

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      const numericValue = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const prelaunchProduct = {
        id: 'prelaunch-hux-ring',
        name: 'HUX Smart Ring - Pre-Launch',
        tagline: 'Intelligence. Worn.',
        subtitle: 'Pre-Launch Special',
        price: 2000,
        mrp: 17999,
        description: 'Pre-launch booking for HUX Smart Ring. Pay ₹2,000 now, ₹8,000 at shipping.',
        features: [
          'Pre-launch pricing: ₹10,000 (Save ₹7,999)',
          'Priority shipping in first batch',
          'Free sizing kit included',
          '60 working days production',
          '7-day money-back guarantee'
        ],
        specs: {
          material: 'Titanium Alloy with Liquid Glass Coating',
          battery: '25 mAh LiPo (Up to 7 Days)',
          waterproof: '5ATM (Up to 50m)',
          sensors: ['Optical Heart Rate', 'SpO2', 'Skin Temp', '3D Accelerometer'],
          connectivity: 'Bluetooth 5.2 Low Energy',
          certifications: ['CE', 'RoHS', 'FCC', 'REACH', 'BIS', 'ISO']
        },
        reviews: []
      };

      addToCart(
        prelaunchProduct,
        formData.color as any,
        parseInt(formData.ringSize) as any,
        1
      );

      localStorage.setItem('prelaunchBooking', JSON.stringify({
        ...formData,
        fullName: `${formData.firstName} ${formData.lastName}`,
        bookingDate: new Date().toISOString(),
        bookingAmount: 2000,
        remainingAmount: 8000
      }));

      navigate('/checkout');
      
    } catch (error) {
      console.error('Booking error:', error);
      alert('There was an error processing your booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const openModal = useCallback(() => setIsOpen(true), []);

  if (!isOpen) {
    return (
      <Button 
        variant="primary" 
        size="large"
        className="text-lg md:text-xl px-8 md:px-12 py-3 md:py-4 shadow-2xl hover:scale-105 transition-transform"
        onClick={openModal}
      >
        Book Now for ₹2,000
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 md:p-8 max-h-[90vh] overflow-y-auto">
        <div className="text-center mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-hux-dark mb-2">Book Your HUX Ring</h2>
          <p className="text-hux-dark/70 text-sm md:text-base">Secure your spot in the first batch</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-hux-dark mb-2">First Name *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-hux-turquoise focus:border-transparent text-gray-900 bg-white text-sm md:text-base"
                placeholder="First name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-hux-dark mb-2">Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-hux-turquoise focus:border-transparent text-gray-900 bg-white text-sm md:text-base"
                placeholder="Last name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-hux-dark mb-2">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-hux-turquoise focus:border-transparent text-gray-900 bg-white text-sm md:text-base"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-hux-dark mb-2">Phone Number *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              maxLength={10}
              className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-hux-turquoise focus:border-transparent text-gray-900 bg-white text-sm md:text-base"
              placeholder="9876543210"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-hux-dark mb-2">Ring Size *</label>
            <select
              name="ringSize"
              value={formData.ringSize}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-hux-turquoise focus:border-transparent text-gray-900 bg-white text-sm md:text-base"
            >
              <option value="">Select size (we'll send sizing kit)</option>
              {ringSizes.map(size => (
                <option key={size} value={size}>Size {size}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-hux-dark mb-2">Color Preference</label>
            <select
              name="color"
              value={formData.color}
              onChange={handleInputChange}
              className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-hux-turquoise focus:border-transparent text-gray-900 bg-white text-sm md:text-base"
            >
              {colors.map(color => (
                <option key={color} value={color}>{color}</option>
              ))}
            </select>
          </div>

          <div className="bg-hux-turquoise/5 rounded-lg p-4 text-sm">
            <h4 className="font-semibold text-hux-dark mb-2">Booking Summary:</h4>
            <ul className="space-y-1 text-hux-dark/80">
              <li>• Booking Amount: ₹2,000 (refundable within 7 days)</li>
              <li>• Remaining Payment: ₹8,000 (at shipping)</li>
              <li>• Total Savings: ₹7,999 from MRP ₹17,999</li>
              <li>• Production Time: 60 working days</li>
            </ul>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              fullWidth
              onClick={() => setIsOpen(false)}
              disabled={isSubmitting}
              className="text-sm md:text-base"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={isSubmitting}
              className="text-sm md:text-base"
            >
              {isSubmitting ? 'Processing...' : 'Proceed to Payment'}
            </Button>
          </div>
        </form>

        <p className="text-xs text-hux-dark/60 text-center mt-4">
          By booking, you agree to our <a href="/preorder-terms" className="text-hux-turquoise hover:underline">Pre-Order Terms</a> and <a href="/privacy-policy" className="text-hux-turquoise hover:underline">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
};