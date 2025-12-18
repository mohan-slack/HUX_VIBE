import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Navbar, Footer } from './components/Layout';
import { Home } from './pages/Home';
import { ShopProvider } from './context/ShopContext';
import { ConciergeAI } from './components/ConciergeAI';

// Lazy load components for better performance
const YourBag = lazy(() => import('./pages/YourBag').then(module => ({ default: module.YourBag })));
const Checkout = lazy(() => import('./pages/Checkout').then(module => ({ default: module.Checkout })));
const OrderSuccess = lazy(() => import('./pages/OrderSuccess').then(module => ({ default: module.OrderSuccess })));
const About = lazy(() => import('./pages/StaticPages').then(module => ({ default: module.About })));
const TrackOrder = lazy(() => import('./pages/StaticPages').then(module => ({ default: module.TrackOrder })));
const Policies = lazy(() => import('./pages/StaticPages').then(module => ({ default: module.Policies })));
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions').then(module => ({ default: module.TermsAndConditions })));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy').then(module => ({ default: module.PrivacyPolicy })));
const PreOrderTermsAndConditions = lazy(() => import('./pages/preOrderTermsAndConditions').then(module => ({ default: module.PreOrderTermsAndConditions })));
const PreLaunch = lazy(() => import('./pages/PreLaunch'));
const Vision = lazy(() => import('./pages/Vision'));
const Influencers = lazy(() => import('./pages/Influencers').then(module => ({ default: module.Influencers })));
const InfluencerSignup = lazy(() => import('./pages/InfluencerSignup').then(module => ({ default: module.InfluencerSignup })));
const InfluencerTerms = lazy(() => import('./pages/InfluencerTerms').then(module => ({ default: module.InfluencerTerms })));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen bg-hux-ivory flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-hux-turquoise border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-hux-dark font-medium">Loading...</p>
    </div>
  </div>
);

// SEO Meta Manager
const SEOMetaManager = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Update meta tags based on route
    const updateMetaTags = () => {
      const path = location.pathname;
      let title = 'HUX Smart Ring - Premium Health Monitoring Wearable | Intelligence Worn';
      let description = 'Experience the future of health monitoring with HUX Smart Ring. Premium titanium design with advanced biometric sensors, 7-day battery, 5ATM waterproof.';
      
      switch (path) {
        case '/bag':
          title = 'Shopping Bag - HUX Smart Ring India | Review Your Order';
          description = 'Review your HUX Smart Ring order. Premium health monitoring wearable made for India with advanced biometric sensors and 7-day battery life. Free shipping across India.';
          break;
        case '/checkout':
          title = 'Checkout - HUX Smart Ring | Secure Payment';
          description = 'Complete your HUX Smart Ring purchase with secure payment options. Fast shipping and premium customer support included.';
          break;
        case '/about':
          title = 'About HUX India - Premium Smart Ring Technology | Made in India';
          description = 'Learn about HUX Smart Ring technology made in India. Our mission to revolutionize health monitoring through premium wearable devices across Indian cities.';
          break;
        case '/track':
          title = 'Track Your Order - HUX Smart Ring | Order Status';
          description = 'Track your HUX Smart Ring order status and delivery information. Get real-time updates on your premium wearable device.';
          break;
        case '/influencers':
          title = 'Influencer Program - HUX Smart Ring India | Partner With Us';
          description = 'Join the HUX Smart Ring influencer program in India. Earn 8% commission promoting premium health monitoring wearables to your audience across Mumbai, Delhi, Bangalore, Chennai.';
          break;
        case '/privacy-policy':
          title = 'Privacy Policy - HUX Smart Ring | Data Protection';
          description = 'HUX Smart Ring privacy policy. Learn how we protect your personal data and health information with industry-leading security measures.';
          break;
        case '/terms-and-conditions':
          title = 'Terms & Conditions - HUX Smart Ring | Legal Information';
          description = 'HUX Smart Ring terms and conditions. Legal information about purchasing and using our premium health monitoring wearables.';
          break;
      }
      
      document.title = title;
      
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      }
      
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute('content', title);
      }
      
      const ogDescription = document.querySelector('meta[property="og:description"]');
      if (ogDescription) {
        ogDescription.setAttribute('content', description);
      }
      
      const twitterTitle = document.querySelector('meta[name="twitter:title"]');
      if (twitterTitle) {
        twitterTitle.setAttribute('content', title);
      }
      
      const twitterDescription = document.querySelector('meta[name="twitter:description"]');
      if (twitterDescription) {
        twitterDescription.setAttribute('content', description);
      }
    };
    
    updateMetaTags();
  }, [location.pathname]);
  
  return null;
};

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

function App() {
  // Performance optimization: preload critical resources
  useEffect(() => {
    // Preload critical images
    const criticalImages = [
      '/images/heroSection/hero-01.png',
      '/images/logo.png',
      '/images/productImages/goldImages/gold01.png',
      '/images/productImages/tarnishImages/tarnish01.png'
    ];
    
    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
    
    // Add performance observer for Core Web Vitals
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime);
          }
          if (entry.entryType === 'first-input') {
            console.log('FID:', entry.processingStart - entry.startTime);
          }
          if (entry.entryType === 'layout-shift') {
            if (!entry.hadRecentInput) {
              console.log('CLS:', entry.value);
            }
          }
        }
      });
      
      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
    }
  }, []);
  
  return (
    <ShopProvider>
      <Router>
        <ScrollToTop />
        <SEOMetaManager />
        <div className="min-h-screen bg-hux-body text-hux-dark selection:bg-hux-accent selection:text-white font-sans">
          <Navbar />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/prelaunch" element={<PreLaunch />} />
              <Route path="/bag" element={<YourBag />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/success/:id" element={<OrderSuccess />} />
              <Route path="/about" element={<About />} />
              <Route path="/vision" element={<Vision />} />
              <Route path="/track" element={<TrackOrder />} />
              <Route path="/policies" element={<Policies />} />
              <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/preorder-terms" element={<PreOrderTermsAndConditions />} />
              <Route path="/influencers" element={<Influencers />} />
              <Route path="/influencer-signup" element={<InfluencerSignup />} />
              <Route path="/influencer-terms" element={<InfluencerTerms />} />
            </Routes>
          </Suspense>
          <ConciergeAI />
          <Footer />
          <SpeedInsights />
        </div>
      </Router>
    </ShopProvider>
  );
}

export default App; 