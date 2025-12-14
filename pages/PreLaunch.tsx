import React, { useState, useEffect } from 'react';
import { Button } from '../components/Button';
import { PreLaunchBooking } from '../components/PreLaunchBooking';
import OrbitingHealthFeatures from '../components/ui/orbiting-health-features';

const PreLaunch: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 30, hours: 12, minutes: 45 });
  const [bookingCount, setBookingCount] = useState(247);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59 };
        return prev;
      });
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const features = [
    { icon: '❤️', title: 'Heart Rate Tracking', desc: 'Continuous monitoring with medical-grade accuracy' },
    { icon: '🧠', title: 'HRV & Sleep Analysis', desc: 'Deep insights into recovery and sleep stages' },
    { icon: '🌡️', title: 'Temperature Monitoring', desc: 'Track body temperature changes 24/7' },
    { icon: '😌', title: 'Stress & Recovery', desc: 'AI-powered stress detection and recovery guidance' },
    { icon: '💧', title: '5ATM Water Resistance', desc: 'Swim, shower, dive - up to 50 meters' },
    { icon: '🔋', title: '7+ Day Battery', desc: 'Week-long battery with 45-minute fast charging' },
    { icon: '⚖️', title: 'Lightweight Premium', desc: 'Titanium alloy - barely noticeable on your finger' }
  ];

  const comparisons = [
    { feature: 'Discreet Design', ring: '✅', watch: '❌', others: '✅' },
    { feature: 'All-Day Comfort', ring: '✅', watch: '❌', others: '⚠️' },
    { feature: 'Sleep Tracking', ring: '✅', watch: '⚠️', others: '✅' },
    { feature: 'Battery Life', ring: '7+ days', watch: '1-2 days', others: '4-7 days' },
    { feature: 'Water Resistance', ring: '5ATM', watch: '3-5ATM', others: '3ATM' },
    { feature: 'Price', ring: '₹10,000*', watch: '₹15,000+', others: '₹25,000+' }
  ];

  const faqs = [
    {
      q: 'What is a smart ring?',
      a: 'A smart ring is a wearable device that tracks health metrics like heart rate, sleep, and activity while being completely discreet and comfortable for 24/7 wear.'
    },
    {
      q: 'Why 60 days pre-launch timeline?',
      a: 'We manufacture each ring to order with premium materials. 60 working days ensures quality control and personalized sizing for every customer.'
    },
    {
      q: 'What happens after I pay ₹2,000?',
      a: 'You\'ll receive a confirmation email, sizing kit within 3 days, and regular updates every 10-15 days about your ring\'s production progress.'
    },
    {
      q: 'Can I change my ring size later?',
      a: 'Yes! We send a sizing kit first. You can confirm your size anytime before production starts (within 7 days of booking).'
    },
    {
      q: 'Is the booking amount refundable?',
      a: 'Yes, the ₹2,000 booking amount is fully refundable within 7 days of booking if you change your mind.'
    },
    {
      q: 'When will I pay the remaining ₹8,000?',
      a: 'You\'ll pay the remaining amount only when your ring is ready to ship (after 60 working days). We\'ll notify you 3 days before.'
    },
    {
      q: 'How do I track my order status?',
      a: 'You\'ll receive email updates every 10-15 days, plus access to our order tracking portal with real-time production status.'
    }
  ];

  return (
    <div className="min-h-screen bg-hux-ivory selection:bg-hux-turquoise selection:text-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 md:px-6 text-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 md:w-64 md:h-64 bg-gradient-to-r from-hux-turquoise/10 to-hux-gold/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 md:w-96 md:h-96 bg-gradient-to-l from-hux-gold/10 to-hux-turquoise/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        <div className="relative max-w-4xl mx-auto">
          <div className="glass mobile-corner-cut p-6 md:p-12 lg:p-16">
          <div className="mb-6">
            <img src="/images/logo.png" alt="HUX" className="h-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-hux-dark mb-6">
              Intelligence.
              <span className="block bg-gradient-to-r from-hux-turquoise to-hux-gold bg-clip-text text-transparent">
                Pre-Launch.
              </span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-neutral-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Premium Health Tracking. Invisible Intelligence. Available for pre-order now.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-hux-turquoise to-hux-gold p-1 rounded-2xl mb-8 inline-block">
            <div className="bg-white px-8 py-4 rounded-xl">
              <p className="text-2xl font-bold text-hux-dark">
                Pre-launch Offer: Get the ₹17,999 Smart Ring for ₹10,000
              </p>
              <p className="text-hux-dark/60 mt-2">Save ₹7,999 instantly</p>
            </div>
          </div>

          <div className="mb-8 flex flex-col items-center">
            <PreLaunchBooking />
            <p className="text-sm text-hux-dark/60 mt-3 text-center">
              Pay remaining ₹8,000 only at shipping
            </p>
          </div>

            {/* Countdown Timer */}
            <div className="flex justify-center gap-4 text-center">
              <div className="glass rounded-lg p-4 min-w-[80px]">
                <div className="text-2xl font-bold text-hux-turquoise">{timeLeft.days}</div>
                <div className="text-xs text-hux-dark/60">DAYS</div>
              </div>
              <div className="glass rounded-lg p-4 min-w-[80px]">
                <div className="text-2xl font-bold text-hux-turquoise">{timeLeft.hours}</div>
                <div className="text-xs text-hux-dark/60">HOURS</div>
              </div>
              <div className="glass rounded-lg p-4 min-w-[80px]">
                <div className="text-2xl font-bold text-hux-turquoise">{timeLeft.minutes}</div>
                <div className="text-xs text-hux-dark/60">MINS</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-Booking Overview */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-hux-dark">
            Simple Pre-Booking Process
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-hux-turquoise rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Book Now</h3>
              <p className="text-hux-dark/70">Pay ₹2,000 to reserve your ring</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-hux-turquoise/70 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Production</h3>
              <p className="text-hux-dark/70">60 working days crafting your ring</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-hux-gold rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Delivery</h3>
              <p className="text-hux-dark/70">Pay ₹8,000 & receive in 7 days</p>
            </div>
          </div>

          <div className="bg-hux-turquoise/5 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Plan A: Pre-Launch Special</h3>
            <div className="grid md:grid-cols-2 gap-6 text-left max-w-2xl mx-auto">
              <div>
                <p className="font-semibold">✅ Pay ₹2,000 now to reserve</p>
                <p className="font-semibold">✅ Pay ₹8,000 at shipping</p>
              </div>
              <div>
                <p className="font-semibold">✅ 60 working days production</p>
                <p className="font-semibold">✅ 7 working days delivery</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-4 bg-gradient-to-r from-hux-turquoise/5 to-hux-gold/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12 text-hux-dark">Why Pre-Book Now?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-2">Save ₹7,999 Instantly</h3>
              <p className="text-hux-dark/70">Exclusive pre-launch pricing</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl mb-4">🚀</div>
              <h3 className="text-xl font-bold mb-2">Early Batch Priority</h3>
              <p className="text-hux-dark/70">Be among the first to receive</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-2">Limited Quantity</h3>
              <p className="text-hux-dark/70">Only 500 units in first batch</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl mb-4">📦</div>
              <h3 className="text-xl font-bold mb-2">Priority Shipping</h3>
              <p className="text-hux-dark/70">Pre-bookers ship first</p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-lg font-semibold text-hux-turquoise">
              {bookingCount} early bookings already secured!
            </p>
          </div>
        </div>
      </section>

      {/* Product Features */}
      <section className="py-16 px-4 bg-white relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-10"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-4xl font-bold text-center mb-12 text-hux-dark scan-line">
            Advanced Health Tracking
          </h2>
          <OrbitingHealthFeatures />
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 px-4 bg-hux-turquoise/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-hux-dark">
            Why Choose HUX Ring?
          </h2>
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
            <table className="w-full">
              <thead className="bg-hux-turquoise text-white">
                <tr>
                  <th className="p-4 text-left">Feature</th>
                  <th className="p-4 text-center">HUX Ring</th>
                  <th className="p-4 text-center">Smartwatch</th>
                  <th className="p-4 text-center">Other Rings</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="p-4 font-semibold">{row.feature}</td>
                    <td className="p-4 text-center font-semibold text-hux-turquoise">{row.ring}</td>
                    <td className="p-4 text-center">{row.watch}</td>
                    <td className="p-4 text-center">{row.others}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Trust & Legitimacy */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-hux-dark">
            Certified & Trusted
          </h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="text-3xl mb-4">🛡️</div>
              <h3 className="font-semibold mb-2">Safety Certified</h3>
              <p className="text-sm text-hux-dark/70">FCC, CE, RoHS, IP68</p>
            </div>
            <div className="p-6">
              <div className="text-3xl mb-4">🏭</div>
              <h3 className="font-semibold mb-2">Premium Manufacturing</h3>
              <p className="text-sm text-hux-dark/70">ISO certified facilities</p>
            </div>
            <div className="p-6">
              <div className="text-3xl mb-4">🔒</div>
              <h3 className="font-semibold mb-2">Data Security</h3>
              <p className="text-sm text-hux-dark/70">End-to-end encryption</p>
            </div>
            <div className="p-6">
              <div className="text-3xl mb-4">📞</div>
              <h3 className="font-semibold mb-2">2-Year Warranty</h3>
              <p className="text-sm text-hux-dark/70">Full coverage included</p>
            </div>
          </div>
        </div>
      </section>

      {/* Payment & Refund Terms */}
      <section className="py-16 px-4 bg-hux-gold/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-hux-dark">
            Transparent Payment Terms
          </h2>
          <div className="bg-white rounded-2xl p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-hux-turquoise">Payment Schedule</h3>
                <ul className="space-y-2 text-hux-dark/80">
                  <li>✅ ₹2,000 booking amount (refundable within 7 days)</li>
                  <li>✅ ₹8,000 remaining payment at shipping</li>
                  <li>✅ No hidden charges or subscription fees</li>
                  <li>✅ Secure payment via Razorpay</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-hux-turquoise">Delivery Promise</h3>
                <ul className="space-y-2 text-hux-dark/80">
                  <li>✅ Production: 60 working days</li>
                  <li>✅ Shipping: 3-7 working days</li>
                  <li>✅ Regular updates every 10-15 days</li>
                  <li>✅ Delay compensation if applicable</li>
                </ul>
              </div>
            </div>
            <div className="mt-8 flex justify-center gap-4">
              <img src="https://razorpay.com/assets/razorpay-logo.svg" alt="Razorpay" className="h-8" />
              <div className="text-2xl">🔒</div>
              <span className="text-sm text-hux-dark/60 self-center">256-bit SSL Encryption</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-hux-dark">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-hux-turquoise/5 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-hux-dark">{faq.q}</h3>
                <p className="text-hux-dark/80">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Footer */}
      <section className="py-16 px-4 bg-gradient-to-r from-hux-turquoise to-hux-gold text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Ready to Join the Future?</h2>
          <p className="text-xl mb-8 opacity-90">
            Limited time offer. Only 500 units available in first batch.
          </p>
          <div className="flex justify-center">
            <PreLaunchBooking />
          </div>
          <p className="text-sm mt-4 opacity-80">
            7-day money-back guarantee • 2-year warranty • Free worldwide shipping
          </p>
          
          {/* Legal Footer Content */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="mb-4 text-sm">
              <strong>Pre-Order Notice:</strong> This is a pre-launch product with 60 working days production timeline. 
              All specifications subject to final manufacturing. Consumer Protection Act compliant.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mb-4">
              <a href="/terms-and-conditions" className="hover:text-white/80 text-sm">Terms & Conditions</a>
              <a href="/privacy-policy" className="hover:text-white/80 text-sm">Privacy Policy</a>
              <a href="/preorder-terms" className="hover:text-white/80 text-sm">Pre-Order Terms</a>
              <span className="text-sm">Warranty Policy</span>
            </div>
            <p className="text-xs opacity-70">
              © 2025 Viveon Gizit Pvt Ltd. All rights reserved. HUX is a trademark of Viveon Gizit Pvt Ltd.
            </p>
          </div>
        </div>
      </section>


    </div>
  );
};

export default PreLaunch;