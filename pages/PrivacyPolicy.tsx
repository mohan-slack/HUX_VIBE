import React from 'react';

export const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-neutral-900 mb-12 text-center">Privacy Policy</h1>
        
        <div className="prose prose-neutral max-w-none text-neutral-700 space-y-8">
          <div>
            <p className="text-sm text-neutral-500 mb-4">Last Updated: 10-01-2026</p>
            <p className="leading-relaxed">
              Thank you for choosing to be part of the HUX community. At Viveon Gizit Pvt. Ltd. ("Company", "we", "us", "our"), your privacy is extremely important to us. This Privacy Policy explains how we collect, use, store, and safeguard your personal information when you use the HUX Ring mobile application ("App"), the HUX Smart Ring device ("Device"), our website and related online services ("Website"), and customer support channels.
            </p>
            <p className="leading-relaxed mt-4">
              If you do not agree with the terms of this Privacy Policy, please discontinue use of the Website, App, and HUX Smart Ring.
            </p>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">1. WHAT INFORMATION DO WE COLLECT?</h2>
            <p className="leading-relaxed font-semibold mb-3">A. Information You Provide</p>
            <p className="leading-relaxed mb-2">When you create an account, we may collect:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Gender (optional)</li>
              <li>Birth year (optional)</li>
            </ul>
            <p className="leading-relaxed font-semibold mb-2">Wellness & Device Information</p>
            <p className="leading-relaxed mb-2">With your explicit consent, the App may collect:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Heart Rate and Heart Rate Variability (HRV)</li>
              <li>Sleep duration and patterns</li>
              <li>Respiratory rate</li>
              <li>Skin temperature variation</li>
              <li>Blood oxygen trend readings</li>
              <li>Steps, activity level, and movement data</li>
              <li>Recovery and readiness insights</li>
            </ul>
            <p className="leading-relaxed mt-3 font-semibold">
              Important: HUX does not diagnose, treat, or monitor medical conditions. Data collected is strictly for wellness and lifestyle insights only.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">2. HOW DO WE USE YOUR INFORMATION?</h2>
            <p className="leading-relaxed mb-3">We use your information for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To create and manage your HUX account</li>
              <li>To sync wellness data from the HUX Smart Ring</li>
              <li>To generate insights, trends, and user dashboards</li>
              <li>To provide customer support</li>
              <li>To improve app functionality and user experience</li>
              <li>To send important notifications (firmware updates, feature updates)</li>
            </ul>
            <p className="leading-relaxed mt-4 font-semibold">
              We do not sell your data. We do not use your health insights for advertising.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">3. WILL YOUR INFORMATION BE SHARED?</h2>
            <p className="leading-relaxed mb-3">We only share your information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>With your explicit consent</li>
              <li>With trusted service providers (cloud hosting, analytics, payment gateways)</li>
              <li>For legal compliance when required by law</li>
            </ul>
            <p className="leading-relaxed mt-3 font-semibold">
              We do not share, sell, rent, or trade your personal information for third-party marketing.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">6. DATA STORAGE & SECURITY</h2>
            <p className="leading-relaxed mb-3">We store your data securely using industry-standard encryption and security practices.</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Secure servers</li>
              <li>Encrypted data during transmission</li>
              <li>Restricted access controls</li>
              <li>Regular security audits</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">9. YOUR PRIVACY RIGHTS</h2>
            <p className="leading-relaxed mb-3">You may request:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access to your data</li>
              <li>Correction of inaccurate information</li>
              <li>Deletion of your account</li>
              <li>Withdrawal of consent</li>
            </ul>
            <p className="leading-relaxed mt-3">
              You may request these actions by emailing: 📧 support@hux.co.in
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">12. HOW TO CONTACT US</h2>
            <p className="leading-relaxed mb-2">If you have questions, concerns, or data-related requests:</p>
            <p className="leading-relaxed mb-2">📧 support@hux.co.in</p>
            <p className="leading-relaxed">🏢 Viveon Gizit Pvt. Ltd., Electronic City, Bangalore, India</p>
          </section>
        </div>
      </div>
    </div>
  );
};
