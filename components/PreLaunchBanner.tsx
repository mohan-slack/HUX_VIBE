import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';

export const PreLaunchBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [bannerClosed, setBannerClosed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

        {/* Background - Video */}
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/images/banners/sensors.mp4" type="video/mp4" />
        </video>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4 md:px-6">
          
          {/* Logo */}
          <div className="mb-4 md:mb-6">
            <img src="/images/logo.png" alt="HUX" className="h-12 md:h-16 lg:h-20 mx-auto mb-3 md:mb-4" loading="eager" />
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-3 md:mb-4">
            Smart Ring
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-4 md:mb-6 opacity-90">
            Pre-Launch Special Offer
          </p>

          {/* Offer Box */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 lg:p-8 mb-6 md:mb-8 max-w-sm md:max-w-md lg:max-w-lg border border-white/20">
            <p className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">
              Save ₹7,999 Instantly!
            </p>
            <p className="text-base md:text-lg lg:text-xl mb-2">
              Get the ₹17,999 Smart Ring for ₹10,000
            </p>
            <p className="text-sm md:text-base opacity-80">
              Book now for just ₹2,000 • Limited to 500 units
            </p>
          </div>

          {/* CTA Button */}
          <Button
            variant="primary"
            onClick={openPreLaunch}
            className="text-lg md:text-xl lg:text-2xl px-6 md:px-8 lg:px-10 py-3 md:py-4 lg:py-5 mb-3 md:mb-4 bg-white text-hux-turquoise hover:bg-white/90"
          >
            Secure Your Ring Now
          </Button>

          <p className="text-xs md:text-sm lg:text-base opacity-70">
            7-day money-back guarantee • 2-year warranty
          </p>
        </div>
      </div>
    </div>
  );
};