import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';

export const PreLaunchBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [bannerClosed, setBannerClosed] = useState(false);

  const closeBanner = () => {
    setIsVisible(false);
    setBannerClosed(true);
  };

  useEffect(() => {
    const handleLogoClick = () => {
      if (bannerClosed) {
        setIsVisible(false);
      }
    };
    
    window.addEventListener('logo-clicked', handleLogoClick);
    return () => window.removeEventListener('logo-clicked', handleLogoClick);
  }, [bannerClosed]);

  const openPreLaunch = () => {
    window.location.href = '/prelaunch';
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl h-[80vh] bg-gradient-to-br from-hux-turquoise to-hux-gold rounded-2xl overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={closeBanner}
          className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Background Video */}
        <div className="absolute inset-0">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="w-full h-full object-cover"
          >
            <source src="/images/banners/sensors.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/50"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6">
          
          {/* Logo */}
          <div className="mb-6">
            <img src="/images/logo.png" alt="HUX" className="h-16 mx-auto mb-4 neon-glow" />
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold mb-4 scan-line">
            Smart Ring
          </h1>
          <p className="text-xl md:text-2xl mb-6 opacity-90">
            Pre-Launch Special Offer
          </p>

          {/* Offer Box */}
          <div className="glass-morphism tech-border rounded-2xl p-6 mb-8 max-w-md">
            <p className="text-2xl font-bold mb-2">
              Save ₹7,999 Instantly!
            </p>
            <p className="text-lg mb-2">
              Get the ₹17,999 Smart Ring for ₹10,000
            </p>
            <p className="text-sm opacity-80">
              Book now for just ₹2,000 • Limited to 500 units
            </p>
          </div>

          {/* CTA Button */}
          <Button
            variant="primary"
            onClick={openPreLaunch}
            className="text-xl px-8 py-4 mb-4"
          >
            Secure Your Ring Now
          </Button>

          <p className="text-sm opacity-70">
            7-day money-back guarantee • 2-year warranty
          </p>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <div 
              key={i}
              className="particle absolute w-1 h-1 bg-white rounded-full opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};