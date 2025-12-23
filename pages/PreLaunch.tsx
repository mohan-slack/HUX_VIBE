import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Button } from '../components/Button';
import { PreLaunchBooking } from '../components/PreLaunchBooking';
import { FaqAccordion } from '../components/ui/faq-chat-accordion';
import { GradientCard } from '../components/ui/gradient-card';

// Lazy load heavy components only when needed
const OrbitingHealthFeatures = lazy(() => import('../components/ui/orbiting-health-features'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-hux-turquoise"></div>
  </div>
);

const PreLaunch: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 30, hours: 12, minutes: 37 });
  const [bookingCount, setBookingCount] = useState('24/7');

  const paymentDeliveryData = [
    {
      badgeText: "Secure Payments",
      badgeColor: "#10b981",
      title: "Payments",
      description: (
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
            <span>₹2,000 refundable within 7 days</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
            <span>₹8,000 payable only at shipping</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
            <span>Secure checkout via Razorpay</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
            <span>No subscriptions, ever</span>
          </div>
        </div>
      ),
      ctaText: "Learn More",
      ctaHref: "#payments",
      imageUrl: "/images/pre-launch/Keep.png",
      gradient: "green" as const,
    },
    {
      badgeText: "Fast Delivery",
      badgeColor: "#02b3d9",
      title: "Delivery",
      description: (
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
            <span>Production: 60 working days</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
            <span>Shipping: 3–7 working days</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
            <span>Updates every 10–15 days</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
            <span>Delay compensation if applicable</span>
          </div>
        </div>
      ),
      ctaText: "Track Order",
      ctaHref: "#delivery",
      imageUrl: "/images/pre-launch/Delivery01.png",
      gradient: "purple" as const,
    },
  ];

  const reserveCardData = [
    {
      badgeText: "Founder Exclusive",
      badgeColor: "#d4af37",
      title: "Save ₹7,999",
      description: "Founder-only pricing with exclusive early access benefits.",
      ctaText: "Reserve Now",
      ctaHref: "#reserve",
      imageUrl: "/images/pre-launch/Keep.png",
      gradient: "orange" as const,
    },
    {
      badgeText: "VIP Access",
      badgeColor: "#02b3d9",
      title: "VIP Pre-Launch Access",
      description: "Reserved customers get priority support and early communication via vip@hux.co.in",
      ctaText: "Learn More",
      ctaHref: "#priority",
      imageUrl: "/images/logo.png",
      gradient: "purple" as const,
    },
    {
      badgeText: "Limited Edition",
      badgeColor: "#ef4444",
      title: "Limited Units",
      description: "Only 500 rings in the first batch. Reserve yours today.",
      ctaText: "Check Availability",
      ctaHref: "#limited",
      imageUrl: "/images/dock/dock003.png",
      gradient: "green" as const,
    },
    {
      badgeText: "Fast Delivery",
      badgeColor: "#10b981",
      title: "Priority Shipping",
      description: "Reserved orders dispatched first with tracking updates.",
      ctaText: "Track Order",
      ctaHref: "#shipping",
      imageUrl: "/images/pre-launch/Delivery01.png",
      gradient: "gray" as const,
    },
  ];

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

  const comparisons = [
    { feature: 'Discreet Design', ring: '✓', watch: '✕', others: '✓' },
    { feature: 'All-Day Comfort', ring: '✓', watch: '✕', others: '◑' },
    { feature: 'Sleep Tracking', ring: '✓', watch: '◑', others: '✓' },
    { feature: 'Battery Life', ring: '7+ days', watch: '1–2 days', others: '4–7 days' },
    { feature: 'Water Resistance', ring: '5 ATM', watch: '3–5 ATM', others: '3 ATM' },
    { feature: 'Price', ring: '₹10,000*', watch: '₹15,000+', others: '₹25,000+' }
  ];

  const faqData = [
    {
      id: 1,
      question: 'What is a smart ring?',
      answer: 'A discreet wearable that tracks your health continuously—without screens or distractions.',
      icon: '💍',
      iconPosition: 'right' as const
    },
    {
      id: 2,
      question: 'Why is the production timeline 60 days?',
      answer: 'Each ring is manufactured to order, ensuring precision fit, durability, and performance.'
    },
    {
      id: 3,
      question: 'What happens after I reserve?',
      answer: 'You receive confirmation, a sizing kit within 3 days, and regular production updates.',
      icon: '📦',
      iconPosition: 'left' as const
    },
    {
      id: 4,
      question: 'Can I change my ring size?',
      answer: 'Yes. Size confirmation is flexible before production begins.'
    },
    {
      id: 5,
      question: 'Is the ₹2,000 refundable?',
      answer: 'Yes. Fully refundable within 7 days.',
      icon: '💰',
      iconPosition: 'right' as const
    },
    {
      id: 6,
      question: 'When do I pay the balance?',
      answer: 'Only when your ring is ready to ship.'
    }
  ];

  return (
    <div className="min-h-screen bg-hux-ivory selection:bg-hux-turquoise selection:text-white relative">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 md:px-6 text-center overflow-hidden z-10">
        <div className="relative max-w-4xl mx-auto">
          <div className="glass mobile-corner-cut p-6 md:p-12 lg:p-16 border-0 relative z-10">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-hux-dark font-mochi">
              Reserve Your HUX Ring
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-neutral-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Invisible intelligence. Designed for everyday life.<br />
              Now open for early reservation.
            </p>
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-hux-dark font-mochi">Founder Pre-Launch Access</h2>
              <div className="bg-gradient-to-r from-hux-turquoise to-hux-gold p-1 rounded-2xl mb-8 inline-block">
                <div className="bg-white px-8 py-4 rounded-xl">
                  <p className="text-xl font-bold text-hux-dark">
                    Retail Price: ₹17,999<br />
                    Founder Price: ₹10,000
                  </p>
                  <p className="text-hux-dark/60 mt-2">Save ₹7,999 with early access</p>
                </div>
              </div>
            </div>

            <div className="mb-8 flex flex-col items-center">
              <PreLaunchBooking />
              <p className="text-sm text-hux-dark/60 mt-3 text-center">
                Reserve today for ₹2,000<br />
                Pay the remaining ₹8,000 only when your ring ships
              </p>
            </div>

            <h3 className="text-xl font-bold mb-4 text-hux-dark font-mochi">Reservation Closes In</h3>
            <div className="flex justify-center gap-2 md:gap-4 text-center mb-4">
              <div className="glass rounded-lg p-3 md:p-4 min-w-[70px] md:min-w-[80px]">
                <div className="text-xl md:text-2xl font-bold text-hux-turquoise">{timeLeft.days}</div>
                <div className="text-xs text-hux-dark/60">DAYS</div>
              </div>
              <div className="glass rounded-lg p-3 md:p-4 min-w-[70px] md:min-w-[80px]">
                <div className="text-xl md:text-2xl font-bold text-hux-turquoise">{timeLeft.hours}</div>
                <div className="text-xs text-hux-dark/60">HOURS</div>
              </div>
              <div className="glass rounded-lg p-3 md:p-4 min-w-[70px] md:min-w-[80px]">
                <div className="text-xl md:text-2xl font-bold text-hux-turquoise">{timeLeft.minutes}</div>
                <div className="text-xs text-hux-dark/60">MINUTES</div>
              </div>
            </div>
            <p className="text-sm text-hux-dark/60">Limited production window. No extensions.</p>
          </div>
        </div>
      </section>

      {/* How Reservation Works */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-hux-dark font-mochi">
            How Reservation Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-hux-turquoise rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Reserve</h3>
              <p className="text-hux-dark/70">Pay ₹2,000 to lock your ring and founder pricing.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-hux-turquoise/70 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Crafted for You</h3>
              <p className="text-hux-dark/70">60 working days of precision manufacturing and quality checks.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-hux-gold rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Delivered</h3>
              <p className="text-hux-dark/70">Pay ₹8,000 at shipping. Delivered within 7 days.</p>
            </div>
          </div>

          <div className="bg-hux-turquoise/5 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Founder Reservation Plan</h3>
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-hux-turquoise text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <span className="font-semibold text-left">₹2,000 today to reserve</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-hux-turquoise text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <span className="font-semibold text-left">₹8,000 at shipping</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-hux-gold text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <span className="font-semibold text-left">60 working days production</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-hux-gold text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <span className="font-semibold text-left">7 working days delivery</span>
                </div>
              </div>
            </div>
            <p className="mt-4 text-hux-dark/70">No subscriptions. No hidden charges.</p>
          </div>
        </div>
      </section>

      {/* Why Reserve Now */}
      <section className="py-16 px-4 bg-gradient-to-r from-hux-turquoise/5 to-hux-gold/5">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12 text-hux-dark font-mochi">Why Reserve Now</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {reserveCardData.map((card, index) => (
              <GradientCard
                key={index}
                badgeText={card.badgeText}
                badgeColor={card.badgeColor}
                title={card.title}
                description={card.description}
                ctaText={card.ctaText}
                ctaHref={card.ctaHref}
                imageUrl={card.imageUrl}
                gradient={card.gradient}
              />
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-lg font-semibold text-hux-turquoise">
              {bookingCount} reservations already secured
            </p>
          </div>
        </div>
      </section>

      {/* Why HUX Over Anything Else */}
      <section className="py-16 px-4 bg-hux-turquoise/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-hux-dark font-mochi">
            Why HUX Over Anything Else
          </h2>
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg overflow-x-auto">
            {/* Header */}
            <div className="grid grid-cols-4 bg-gray-50 border-b min-w-[600px]">
              <div className="p-2 md:p-4"></div>
              <div className="p-2 md:p-4 text-center font-bold text-hux-dark border-l text-sm md:text-base">
                HUX Ring
              </div>
              <div className="p-2 md:p-4 text-center font-bold text-hux-dark border-l text-sm md:text-base">
                Smartwatch
              </div>
              <div className="p-2 md:p-4 text-center font-bold text-hux-dark border-l text-sm md:text-base">
                Other Rings
              </div>
            </div>
            
            {/* Rows */}
            <div className="grid grid-cols-4 border-b min-w-[600px]">
              <div className="p-2 md:p-4 font-semibold bg-gray-50 text-sm md:text-base">Discreet Design</div>
              <div className="p-2 md:p-4 text-center border-l bg-hux-turquoise/10">
                <span className="text-hux-turquoise text-lg md:text-xl font-bold">✓</span>
              </div>
              <div className="p-2 md:p-4 text-center border-l">
                <span className="text-red-500 text-lg md:text-xl">✕</span>
              </div>
              <div className="p-2 md:p-4 text-center border-l">
                <span className="text-hux-turquoise text-lg md:text-xl font-bold">✓</span>
              </div>
            </div>
            
            <div className="grid grid-cols-4 border-b min-w-[600px]">
              <div className="p-2 md:p-4 font-semibold bg-gray-50 text-sm md:text-base">All-Day Comfort</div>
              <div className="p-2 md:p-4 text-center border-l bg-hux-turquoise/10">
                <span className="text-hux-turquoise text-lg md:text-xl font-bold">✓</span>
              </div>
              <div className="p-2 md:p-4 text-center border-l">
                <span className="text-red-500 text-lg md:text-xl">✕</span>
              </div>
              <div className="p-2 md:p-4 text-center border-l">
                <span className="text-yellow-500 text-lg md:text-xl">◑</span>
              </div>
            </div>
            
            <div className="grid grid-cols-4 border-b min-w-[600px]">
              <div className="p-2 md:p-4 font-semibold bg-gray-50 text-sm md:text-base">Sleep Tracking</div>
              <div className="p-2 md:p-4 text-center border-l bg-hux-turquoise/10">
                <span className="text-xs md:text-sm font-medium">Comprehensive Sleep Stages with 10+ Metrics</span>
              </div>
              <div className="p-2 md:p-4 text-center border-l">
                <span className="text-xs md:text-sm">Basic sleep tracking</span>
              </div>
              <div className="p-2 md:p-4 text-center border-l">
                <span className="text-xs md:text-sm">Basic sleep tracking</span>
              </div>
            </div>
            
            <div className="grid grid-cols-4 border-b min-w-[600px]">
              <div className="p-2 md:p-4 font-semibold bg-gray-50 text-sm md:text-base">HRV Monitoring</div>
              <div className="p-2 md:p-4 text-center border-l bg-hux-turquoise/10">
                <span className="text-xs md:text-sm font-medium">SDNN, RMSSD metrics</span>
              </div>
              <div className="p-2 md:p-4 text-center border-l">
                <span className="text-xs md:text-sm">Basic HRV</span>
              </div>
              <div className="p-2 md:p-4 text-center border-l">
                <span className="text-xs md:text-sm">Limited HRV</span>
              </div>
            </div>
            
            <div className="grid grid-cols-4 border-b min-w-[600px]">
              <div className="p-2 md:p-4 font-semibold bg-gray-50 text-sm md:text-base">Step Counting</div>
              <div className="p-2 md:p-4 text-center border-l bg-hux-turquoise/10">
                <span className="text-hux-turquoise text-lg md:text-xl font-bold">✓</span>
              </div>
              <div className="p-2 md:p-4 text-center border-l">
                <span className="text-hux-turquoise text-lg md:text-xl font-bold">✓</span>
              </div>
              <div className="p-2 md:p-4 text-center border-l">
                <span className="text-hux-turquoise text-lg md:text-xl font-bold">✓</span>
              </div>
            </div>
            
            <div className="grid grid-cols-4 border-b min-w-[600px]">
              <div className="p-2 md:p-4 font-semibold bg-gray-50 text-sm md:text-base">Distance & Calories</div>
              <div className="p-2 md:p-4 text-center border-l bg-hux-turquoise/10">
                <span className="text-hux-turquoise text-lg md:text-xl font-bold">✓</span>
              </div>
              <div className="p-2 md:p-4 text-center border-l">
                <span className="text-hux-turquoise text-lg md:text-xl font-bold">✓</span>
              </div>
              <div className="p-2 md:p-4 text-center border-l">
                <span className="text-hux-turquoise text-lg md:text-xl font-bold">✓</span>
              </div>
            </div>
            
            <div className="grid grid-cols-4 border-b min-w-[600px]">
              <div className="p-2 md:p-4 font-semibold bg-gray-50 text-sm md:text-base">VO2 Max</div>
              <div className="p-2 md:p-4 text-center border-l bg-hux-turquoise/10">
                <span className="text-hux-turquoise text-lg md:text-xl font-bold">✓</span>
              </div>
              <div className="p-2 md:p-4 text-center border-l">
                <span className="text-hux-turquoise text-lg md:text-xl font-bold">✓</span>
              </div>
              <div className="p-2 md:p-4 text-center border-l">
                <span className="text-hux-turquoise text-lg md:text-xl font-bold">✓</span>
              </div>
            </div>
            
            <div className="grid grid-cols-4 border-b min-w-[600px]">
              <div className="p-2 md:p-4 font-semibold bg-gray-50 text-sm md:text-base">Stress Monitoring</div>
              <div className="p-2 md:p-4 text-center border-l bg-hux-turquoise/10">
                <span className="text-hux-turquoise text-lg md:text-xl font-bold">✓</span>
              </div>
              <div className="p-2 md:p-4 text-center border-l">
                <span className="text-hux-turquoise text-lg md:text-xl font-bold">✓</span>
              </div>
              <div className="p-2 md:p-4 text-center border-l">
                <span className="text-hux-turquoise text-lg md:text-xl font-bold">✓</span>
              </div>
            </div>
            
            <div className="grid grid-cols-4 border-b min-w-[600px]">
              <div className="p-2 md:p-4 font-semibold bg-gray-50 text-sm md:text-base">Battery Life</div>
              <div className="p-2 md:p-4 text-center border-l bg-hux-turquoise/10 font-semibold text-hux-turquoise text-sm md:text-base">
                7+ days
              </div>
              <div className="p-2 md:p-4 text-center border-l text-sm md:text-base">
                1–2 days
              </div>
              <div className="p-2 md:p-4 text-center border-l text-sm md:text-base">
                4–7 days
              </div>
            </div>
            
            <div className="grid grid-cols-4 border-b min-w-[600px]">
              <div className="p-2 md:p-4 font-semibold bg-gray-50 text-sm md:text-base">Water Resistance</div>
              <div className="p-2 md:p-4 text-center border-l bg-hux-turquoise/10 font-semibold text-hux-turquoise text-sm md:text-base">
                5 ATM
              </div>
              <div className="p-2 md:p-4 text-center border-l text-sm md:text-base">
                3–5 ATM
              </div>
              <div className="p-2 md:p-4 text-center border-l text-sm md:text-base">
                3 ATM
              </div>
            </div>
            
            <div className="grid grid-cols-4 min-w-[600px]">
              <div className="p-2 md:p-4 font-semibold bg-gray-50 text-sm md:text-base">Price</div>
              <div className="p-2 md:p-4 text-center border-l bg-hux-turquoise/10 font-bold text-hux-turquoise text-sm md:text-base">
                ₹10,000*
              </div>
              <div className="p-2 md:p-4 text-center border-l text-sm md:text-base">
                ₹15,000+
              </div>
              <div className="p-2 md:p-4 text-center border-l text-sm md:text-base">
                ₹25,000+
              </div>
            </div>
            
            <div className="p-2 md:p-4 text-center text-xs md:text-sm text-hux-dark/60 bg-gray-50 min-w-[600px]">
              *Founder price.
            </div>
          </div>
        </div>
      </section>

      {/* Certified. Secure. Trusted. */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-hux-dark font-mochi">
            Certified. Secure. Trusted.
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            <div className="p-4 md:p-6">
              <div className="text-2xl md:text-3xl mb-3 md:mb-4">🛡️</div>
              <h3 className="font-semibold mb-2 text-sm md:text-base">FCC · CE · RoHS · IP68 Certified</h3>
            </div>
            <div className="p-4 md:p-6">
              <div className="text-2xl md:text-3xl mb-3 md:mb-4">🏭</div>
              <h3 className="font-semibold mb-2 text-sm md:text-base">ISO-certified facilities</h3>
            </div>
            <div className="p-4 md:p-6">
              <div className="text-2xl md:text-3xl mb-3 md:mb-4">🔒</div>
              <h3 className="font-semibold mb-2 text-sm md:text-base">End-to-end encrypted data</h3>
            </div>
            <div className="p-4 md:p-6">
              <div className="text-2xl md:text-3xl mb-3 md:mb-4">📞</div>
              <h3 className="font-semibold mb-2 text-sm md:text-base">2-Year Warranty included</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Payment & Delivery Transparency */}
      <section className="py-16 px-4 bg-hux-gold/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-hux-dark font-mochi">
            Payment & Delivery Transparency
          </h2>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8">
            {paymentDeliveryData.map((card, index) => (
              <GradientCard
                key={index}
                badgeText={card.badgeText}
                badgeColor={card.badgeColor}
                title={card.title}
                description={card.description}
                ctaText={card.ctaText}
                ctaHref={card.ctaHref}
                imageUrl={card.imageUrl}
                gradient={card.gradient}
              />
            ))}
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-3 md:gap-4">
            <img src="https://razorpay.com/assets/razorpay-logo.svg" alt="Razorpay" className="h-6 md:h-8" loading="lazy" />
            <div className="text-xl md:text-2xl">🔒</div>
            <span className="text-xs md:text-sm text-hux-dark/60 text-center">256-bit SSL Encryption</span>
          </div>
        </div>
      </section>

      {/* Ready to Reserve? */}
      <section className="py-16 px-4 bg-gradient-to-r from-hux-turquoise to-hux-gold text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-mochi">Ready to Reserve?</h2>
              <p className="text-lg md:text-xl mb-8 opacity-90">
                Founder batch is limited to 500 units.
              </p>
              <div className="flex justify-center lg:justify-start">
                <PreLaunchBooking />
              </div>
              <p className="text-sm mt-4 opacity-80">
                Founder pricing • Secure checkout • No risk
              </p>
              
              {/* Legal Footer Content */}
              <div className="mt-8 lg:mt-12 pt-6 lg:pt-8 border-t border-white/20">
                <p className="mb-4 text-xs md:text-sm">
                  <strong>Pre-Order Notice:</strong> This is a pre-launch product with a 60 working day production timeline. 
                  Specifications subject to final manufacturing. Fully compliant with the Consumer Protection Act.
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 lg:gap-6 mb-4">
                  <a href="/terms-and-conditions" className="hover:text-white/80 text-xs md:text-sm">Terms & Conditions</a>
                  <a href="/privacy-policy" className="hover:text-white/80 text-xs md:text-sm">Privacy Policy</a>
                  <a href="/preorder-terms" className="hover:text-white/80 text-xs md:text-sm">Pre-Order Terms</a>
                  <span className="text-xs md:text-sm">Warranty Policy</span>
                </div>
                <p className="text-xs opacity-70">
                  © 2025 Viveon Gizit Pvt Ltd. HUX™ is a registered trademark.
                </p>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6">
              <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-white font-mochi">FAQ</h3>
              <FaqAccordion 
                data={faqData}
                className=""
                timestamp=""
                questionClassName="bg-white/20 hover:bg-white/30 text-white text-sm md:text-base"
                answerClassName="bg-white text-hux-turquoise text-sm md:text-base"
              />
              <div className="mt-4 md:mt-6 pt-4 border-t border-white/20">
                <p className="text-xs md:text-sm text-white/80 mb-2">You are part of the HUX Founder Batch.</p>
                <p className="text-xs md:text-sm text-white/80 mb-2">For any assistance, reach out to <a href="mailto:vip@hux.co.in" className="text-white font-semibold hover:text-white/80 transition-colors">vip@hux.co.in</a></p>
                <p className="text-xs md:text-sm text-white/80">for priority support.</p>
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default PreLaunch;