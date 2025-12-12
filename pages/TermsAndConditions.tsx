import React from 'react';

export const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-white py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-neutral-900 mb-12 text-center">Terms & Conditions</h1>
        
        <div className="prose prose-neutral max-w-none text-neutral-700 space-y-8">
          <div>
            <p className="text-sm text-neutral-500 mb-4">Last Updated: 10-01-2026</p>
            <p className="leading-relaxed">
              Welcome to the official website and mobile application of the HUX Smart Ring ("Product"), owned and operated by Viveon Gizit Pvt. Ltd. ("Company", "we", "us", or "our"). These Terms and Conditions ("Terms") govern your access to and use of our Website, HUX Ring Mobile Application ("App"), Products, and related services ("Services").
            </p>
            <p className="leading-relaxed mt-4">
              By accessing or using any part of our Services, you agree to be bound by these Terms. If you do not agree, you must stop using the Services immediately.
            </p>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">1. ELIGIBILITY</h2>
            <p className="leading-relaxed">
              You must be 18 years or older to purchase or use the Product and App. Minors may only use the Product under strict supervision and consent of a parent or legal guardian.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">2. OUR SERVICES</h2>
            <p className="leading-relaxed mb-3">Viveon Gizit Pvt. Ltd. provides:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The HUX Smart Ring – a wellness device offering biometric insights</li>
              <li>The HUX Ring App – a mobile application for viewing ring-generated wellness metrics</li>
              <li>Customer support via support@hux.co.in</li>
            </ul>
            <p className="leading-relaxed mt-3">We may modify, update, or discontinue any part of the Services at any time.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">3. HEALTH DISCLAIMER</h2>
            <p className="leading-relaxed font-semibold mb-3">The HUX Smart Ring is NOT a medical device.</p>
            <p className="leading-relaxed mb-2">
              It does not diagnose, treat, cure, prevent, or monitor any disease or medical condition. All insights and metrics are for general wellness and lifestyle purposes only.
            </p>
            <p className="leading-relaxed mb-2">
              Always consult a qualified healthcare provider before making decisions based on app insights.
            </p>
            <p className="leading-relaxed">
              You acknowledge and agree that you use the Product entirely at your own discretion and risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">8. REFUND & REPLACEMENT POLICY</h2>
            <p className="leading-relaxed mb-3">Refunds are only applicable in cases of verified manufacturing defects.</p>
            <p className="leading-relaxed font-semibold mb-2">8.1 Conditions for Refund or Replacement</p>
            <ul className="list-disc pl-6 space-y-2 mb-3">
              <li>You must raise the complaint within 8 hours of product delivery</li>
              <li>Complaints raised after 8 hours will not be eligible</li>
              <li>The Product must be unused and returned in original condition</li>
              <li>The Company will inspect the returned unit and determine eligibility</li>
            </ul>
            <p className="leading-relaxed font-semibold mb-2">8.2 What is NOT Covered</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Change of mind</li>
              <li>Size issues</li>
              <li>Accidental damage</li>
              <li>Water damage beyond rated tolerance</li>
              <li>Wear and tear</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">9. WARRANTY POLICY (6 Months)</h2>
            <p className="leading-relaxed mb-3">Your HUX Smart Ring comes with a 6-month limited manufacturer warranty covering functional defects.</p>
            <p className="leading-relaxed font-semibold mb-2">9.1 Warranty Coverage</p>
            <ul className="list-disc pl-6 space-y-2 mb-3">
              <li>Sensors</li>
              <li>Battery performance</li>
              <li>Internal electronic components</li>
              <li>Charging issues</li>
            </ul>
            <p className="leading-relaxed font-semibold mb-2">9.2 Warranty Exclusions</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Physical damage, dents, scratches</li>
              <li>Liquid damage due to improper usage</li>
              <li>Damage caused by unauthorized charging accessories</li>
              <li>Software tampering</li>
              <li>Loss or theft of the ring</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">10. SHIPPING & DELIVERY</h2>
            <p className="leading-relaxed mb-2">We provide delivery across India.</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Orders are typically dispatched within 48 hours after size confirmation</li>
              <li>Delivery timelines may vary by location</li>
              <li>Orders placed on weekends/holidays ship on the next working day</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">22. CONTACT INFORMATION</h2>
            <p className="leading-relaxed mb-2">For support, warranty, or complaints:</p>
            <p className="leading-relaxed mb-2">📧 support@hux.co.in</p>
            <p className="leading-relaxed">🏢 Viveon Gizit Pvt. Ltd., Electronic City, Bangalore, India</p>
          </section>
        </div>
      </div>
    </div>
  );
};
