import React from 'react';
import { ShoppingBag, Menu, X, ArrowRight, Instagram, Twitter, Facebook, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useShop } from '../context/ShopContext';


export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { cart } = useShop();
  const location = useLocation();
  const navigate = useNavigate();

  // Hide Navbar on Checkout page
  if (location.pathname === '/checkout') return null;

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleNavigation = (path: string, hash?: string) => {
    setIsMenuOpen(false);
    if (hash) {
      if (location.pathname === '/') {
        const elem = document.getElementById(hash);
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/', { state: { scrollTo: hash } });
      }
    } else {
      navigate(path);
      window.scrollTo(0, 0);
    }
  };

  return (
    <nav className="fixed top-4 left-4 right-4 z-50 rounded-2xl glass transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-bold tracking-wide text-neutral-500 font-display uppercase">
          <button onClick={() => handleNavigation('/prelaunch')} className="hover:text-white transition-colors bg-gradient-to-r from-hux-turquoise to-hux-gold px-3 py-1 rounded-full text-white font-bold border border-white/20">Pre-Launch</button>
          <button onClick={() => handleNavigation('/', 'collection')} className="hover:text-hux-turquoise transition-colors">Collection</button>
          <button onClick={() => handleNavigation('/', 'ecosystem')} className="hover:text-hux-turquoise transition-colors">Ecosystem</button>
        </div>

        {/* Centered Logo */}
        <button onClick={() => { handleNavigation('/'); window.dispatchEvent(new Event('logo-clicked')); }} className="absolute left-1/2 -translate-x-1/2 hover:opacity-80 transition-all duration-300">
          <div className="relative flex items-center justify-center overflow-hidden">
            {/* Sound Wave Half Circles */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="sound-wave-left-1"></div>
              <div className="sound-wave-left-2"></div>
              <div className="sound-wave-left-3"></div>
              <div className="sound-wave-right-1"></div>
              <div className="sound-wave-right-2"></div>
              <div className="sound-wave-right-3"></div>
            </div>
            <img src="/images/logo.png" alt="HUX" className="h-8 logo-glow relative z-10" />
          </div>
        </button>

        {/* Right Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-bold tracking-wide text-neutral-500 font-display uppercase ml-auto">
          <button onClick={() => handleNavigation('/about')} className="hover:text-hux-turquoise transition-colors">Vision</button>
          <button onClick={() => handleNavigation('/track')} className="hover:text-hux-turquoise transition-colors">Support</button>
        </div>

        <div className="flex items-center gap-6 md:ml-0">
          <button 
            onClick={() => navigate('/bag')}
            className="relative p-2 text-hux-dark hover:text-hux-turquoise transition-colors"
          >
            <ShoppingBag size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-hux-turquoise to-hux-turquoiseLight text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-sm">
                {cartCount}
              </span>
            )}
          </button>
          
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-hux-dark">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 mt-2 glass rounded-2xl p-6 flex flex-col gap-4 shadow-xl animate-slideUp">
          <button onClick={() => handleNavigation('/prelaunch')} className="text-lg font-display font-bold bg-gradient-to-r from-hux-turquoise to-hux-gold px-3 py-1 rounded-full text-white border border-white/20 text-left">Pre-Launch</button>
          <button onClick={() => handleNavigation('/', 'collection')} className="text-lg font-display font-medium text-hux-dark text-left">Collection</button>
          <button onClick={() => handleNavigation('/about')} className="text-lg font-display font-medium text-hux-dark text-left">Vision</button>
          <button onClick={() => handleNavigation('/track')} className="text-lg font-display font-medium text-hux-dark text-left">Track Order</button>
        </div>
      )}
    </nav>
  );
};

export const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Hide Footer on Checkout page
  if (location.pathname === '/checkout') return null;

  const handleNavigation = (path: string, hash?: string) => {
    if (hash) {
      if (location.pathname === '/') {
        const elem = document.getElementById(hash);
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/', { state: { scrollTo: hash } });
      }
    } else {
      navigate(path);
      window.scrollTo(0, 0);
    }
  };

  return (
    <footer className="mt-20 border-t border-white/50 bg-white/40 backdrop-blur-lg pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <h3 className="text-3xl font-display font-bold text-hux-dark">HUX</h3>
            <p className="text-neutral-500 text-sm leading-relaxed">
              Intelligence Worn.<br/>
              The convergence of luxury and biometric technology.
            </p>
            <div className="flex gap-4 text-neutral-400">
               <Instagram size={20} className="hover:text-hux-turquoise cursor-pointer transition-colors" />
               <Twitter size={20} className="hover:text-hux-turquoise cursor-pointer transition-colors" />
               <Facebook size={20} className="hover:text-hux-turquoise cursor-pointer transition-colors" />
            </div>
          </div>
          
          {/* Links */}
          <div>
            <h4 className="text-hux-dark font-bold font-display uppercase tracking-wider text-xs mb-6">Explore</h4>
            <ul className="space-y-3 text-neutral-500 text-sm">
              <li><button onClick={() => handleNavigation('/', 'collection')} className="hover:text-hux-turquoise transition-colors">Smart Ring</button></li>
              <li><button onClick={() => handleNavigation('/about')} className="hover:text-hux-turquoise transition-colors">Technology</button></li>
              <li><button onClick={() => handleNavigation('/track')} className="hover:text-hux-turquoise transition-colors">Order Status</button></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-200/50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-400 font-medium">
          <p>© 2025 Viveon Gizit Pvt Ltd. All rights reserved. HUX are trademark of Viveon Gizit Pvt Ltd and may not be used without permission.</p>
          <div className="flex gap-6">
            <button onClick={() => handleNavigation('/policies')} className="hover:text-hux-turquoise">Privacy</button>
            <button onClick={() => handleNavigation('/policies')} className="hover:text-hux-turquoise">Terms</button>
            <button onClick={() => handleNavigation('/policies')} className="hover:text-hux-turquoise">Compliance</button>
          </div>
        </div>
      </div>
    </footer>
  );
};