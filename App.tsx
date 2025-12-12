import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar, Footer } from './components/Layout';
import { Home } from './pages/Home';
import { YourBag } from './pages/YourBag';
import { Checkout } from './pages/Checkout';
import { OrderSuccess } from './pages/OrderSuccess';
import { About, TrackOrder, Policies } from './pages/StaticPages';
import { TermsAndConditions } from './pages/TermsAndConditions';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { PreOrderTermsAndConditions } from './pages/PreOrderTermsAndConditions';
import { ShopProvider } from './context/ShopContext';
import { ConciergeAI } from './components/ConciergeAI';

function App() {
  return (
    <ShopProvider>
      <Router>
        <div className="min-h-screen bg-hux-body text-hux-dark selection:bg-hux-accent selection:text-white font-sans">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bag" element={<YourBag />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/success/:id" element={<OrderSuccess />} />
            <Route path="/about" element={<About />} />
            <Route path="/track" element={<TrackOrder />} />
            <Route path="/policies" element={<Policies />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/preorder-terms" element={<PreOrderTermsAndConditions />} />
          </Routes>
          <ConciergeAI />
          <Footer />
        </div>
      </Router>
    </ShopProvider>
  );
}

export default App;