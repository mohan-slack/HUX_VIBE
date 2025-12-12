import React from 'react';
import { ShoppingBag, Menu, X, ArrowRight, Instagram, Twitter, Facebook, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { FAQ_DATA } from '../constants';

// Custom SVG Logo for HUX
const HuxLogo = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 64 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    aria-label="HUX"
  >
    <path d="M4 2V22M4 12H16M16 2V22" stroke="currentColor" strokeWidth="3" strokeLinecap="square" />
    <path d="M26 2V16C26 19.3137 28.6863 22 32 22C35.3137 22 38 19.3137 38 16V2" stroke="currentColor" strokeWidth="3" strokeLinecap="square" />
    <path d="M48 2L60 22M60 2L48 22" stroke="currentColor" strokeWidth="3" strokeLinecap="square" />
  </svg>
);

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { cart, setIsCartOpen } = useShop();
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
      <div className="max-w-7xl mx-auto px-6 h-16 relative flex items-center justify-between">
        
        {/* Left: Navigation Links */}
        <div className="flex-1 flex justify-start">
          <div className="hidden md:flex items-center gap-8 text-sm font-bold tracking-wide text-neutral-500 font-display uppercase">
            <button onClick={() => handleNavigation('/', 'collection')} className={`hover:text-hux-turquoise transition-colors`}>Collection</button>
            <button onClick={() => handleNavigation('/', 'ecosystem')} className="hover:text-hux-turquoise transition-colors">Ecosystem</button>
            <button onClick={() => handleNavigation('/about')} className="hover:text-hux-turquoise transition-colors">Vision</button>
            <button onClick={() => handleNavigation('/track')} className="hover:text-hux-turquoise transition-colors">Support</button>
          </div>
        </div>

        {/* Center: Logo (Absolute Positioned) */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <button onClick={() => handleNavigation('/')} className="text-hux-dark hover:text-hux-turquoise transition-colors flex items-center justify-center p-2">
            <HuxLogo className="h-7 w-auto" />
          </button>
        </div>

        {/* Right: Cart & Menu */}
        <div className="flex-1 flex justify-end items-center gap-6">
          <button 
            onClick={() => setIsCartOpen(true)}
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
          <button onClick={() => handleNavigation('/', 'collection')} className="text-lg font-display font-medium text-hux-dark text-left">Collection</button>
          <button onClick={() => handleNavigation('/about')} className="text-lg font-display font-medium text-hux-dark text-left">Vision</button>
          <button onClick={() => handleNavigation('/track')} className="text-lg font-display font-medium text-hux-dark text-left">Track Order</button>
        </div>
      )}
    </nav>
  );
};

export const Footer = () => {
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Hide Footer on Checkout page
  if (location.pathname === '/checkout') return null;

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
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

          {/* FAQ Accordion */}
          <div className="lg:col-span-2">
            <h4 className="text-hux-dark font-bold font-display uppercase tracking-wider text-xs mb-6">Frequently Asked Questions</h4>
            <div className="space-y-2">
              {FAQ_DATA.map((faq, idx) => (
                <div key={idx} className="bg-white/50 border border-white/50 rounded-lg overflow-hidden transition-all">
                  <button 
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex justify-between items-center p-4 text-left hover:bg-white/80 transition-colors"
                  >
                    <span className="font-medium text-sm text-hux-dark">{faq.question}</span>
                    {openFaq === idx ? <ChevronUp size={16} className="text-hux-turquoise"/> : <ChevronDown size={16} className="text-neutral-400"/>}
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openFaq === idx ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="p-4 pt-0 text-sm text-neutral-500 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-200/50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-400 font-medium">
          <p>© 2024 HUX Technologies. Crafted with precision.</p>
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