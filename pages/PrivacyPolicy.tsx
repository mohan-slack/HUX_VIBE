import React from 'react';
import { Link } from 'react-router-dom';

export const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-hux-ivory via-white to-stone-50 py-12 px-4 selection:bg-hux-dark selection:text-white">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-white/20 p-8 md:p-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-hux-dark mb-4">Privacy Policy – HUX</h1>
            <p className="text-gray-600">Last Updated: [●]</p>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <p>
              This Privacy Policy explains how Viveon Gizit Pvt. Ltd., doing business as HUX ("HUX", "we", "us", or "our"), collects, uses, discloses, and protects personal information when you access our website, products, services, applications, or participate in our programs, including the HUX Influencer Program.
            </p>

            <p>
              By using HUX services, you agree to the practices described in this Privacy Policy.
            </p>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-hux-dark mb-4">1. Who We Are</h2>
                <div className="space-y-2">
                  <p><strong>Company Name:</strong> Viveon Gizit Pvt. Ltd.</p>
                  <p><strong>Brand:</strong> HUX</p>
                  <p><strong>Registered Country:</strong> India</p>
                  <p><strong>Contact Email:</strong> support@hux.co.in</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-hux-dark mb-4">2. Scope of This Policy</h2>
                <p>This Privacy Policy applies to:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>HUX websites and landing pages</li>
                  <li>HUX Smart Ring products</li>
                  <li>Mobile applications (current or future)</li>
                  <li>Creator / Influencer / Partner programs</li>
                  <li>Customer support interactions</li>
                  <li>Marketing, surveys, and communications</li>
                </ul>
                <p>This policy does not apply to third-party websites or platforms linked from HUX.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-hux-dark mb-4">3. Information We Collect</h2>
                
                <h3 className="text-xl font-semibold text-hux-dark mt-6 mb-3">3.1 Information You Provide Directly</h3>
                <p>We may collect:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Full name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Shipping and billing address</li>
                  <li>Social media handles (for Influencer Program)</li>
                  <li>Payment-related details (processed via secure third-party providers)</li>
                  <li>Communications with customer support</li>
                  <li>Creator application details and content links</li>
                </ul>

                <h3 className="text-xl font-semibold text-hux-dark mt-6 mb-3">3.2 Product & Usage Information</h3>
                <p>When you use HUX products or services, we may collect:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Device identifiers</li>
                  <li>App interaction data</li>
                  <li>Feature usage analytics</li>
                  <li>Referral or creator tracking identifiers</li>
                </ul>
                <p className="font-semibold">Important:</p>
                <p>HUX does not sell personal data and does not collect medical diagnoses. Any health-related insights are informational only.</p>

                <h3 className="text-xl font-semibold text-hux-dark mt-6 mb-3">3.3 Automatically Collected Information</h3>
                <p>We may automatically collect:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>IP address</li>
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>Pages viewed and time spent</li>
                  <li>Cookies and similar technologies</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-hux-dark mb-4">4. Influencer & Creator-Specific Data</h2>
                <p>For Influencer Program participants, we may collect:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Creator profile information</li>
                  <li>Tracking links or codes</li>
                  <li>Performance metrics (clicks, orders, rewards)</li>
                  <li>Payout and tax-related information (where required)</li>
                </ul>
                <p>This data is used only to operate and manage the Program.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-hux-dark mb-4">5. How We Use Your Information</h2>
                <p>We use your information to:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Provide and improve HUX products and services</li>
                  <li>Process orders and payments</li>
                  <li>Manage creator and influencer programs</li>
                  <li>Track rewards, referrals, and payouts</li>
                  <li>Communicate updates, support responses, and important notices</li>
                  <li>Improve user experience and platform security</li>
                  <li>Comply with legal and regulatory obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-hux-dark mb-4">6. Legal Basis for Processing (GDPR Alignment)</h2>
                <p>We process personal data based on:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Consent (e.g., newsletters, creator applications)</li>
                  <li>Contractual necessity (orders, rewards, payouts)</li>
                  <li>Legal obligations</li>
                  <li>Legitimate business interests, without overriding user rights</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-hux-dark mb-4">7. Cookies & Tracking Technologies</h2>
                <p>We use cookies to:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Remember preferences</li>
                  <li>Analyze traffic and performance</li>
                  <li>Track referral attribution</li>
                </ul>
                <p>You can control cookies through your browser settings. Disabling cookies may affect certain features.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-hux-dark mb-4">8. Data Sharing & Disclosure</h2>
                <p>We may share data with:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Payment processors</li>
                  <li>Shipping and logistics partners</li>
                  <li>Analytics and hosting providers</li>
                  <li>Legal or regulatory authorities (if required)</li>
                </ul>
                <p>We do not sell personal data to third parties.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-hux-dark mb-4">9. International Data Transfers</h2>
                <p>Your information may be stored or processed outside your country, including on secure cloud servers.</p>
                <p>We ensure appropriate safeguards for cross-border data transfers.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-hux-dark mb-4">10. Data Retention</h2>
                <p>We retain personal data only for as long as necessary to:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Fulfill business purposes</li>
                  <li>Comply with legal requirements</li>
                  <li>Resolve disputes</li>
                  <li>Enforce agreements</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-hux-dark mb-4">11. Data Security</h2>
                <p>We implement:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Secure servers and encryption</li>
                  <li>Access controls and monitoring</li>
                  <li>Regular security reviews</li>
                </ul>
                <p>However, no system is completely secure. You acknowledge and accept this risk.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-hux-dark mb-4">12. Your Rights</h2>
                <p>Depending on your jurisdiction, you may have the right to:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Access your personal data</li>
                  <li>Correct inaccurate data</li>
                  <li>Request deletion</li>
                  <li>Withdraw consent</li>
                  <li>Object to certain processing</li>
                  <li>Request data portability</li>
                </ul>
                <p>Requests can be sent to: support@hux.co.in</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-hux-dark mb-4">13. Children's Privacy</h2>
                <p>HUX services are not intended for individuals under 18.</p>
                <p>We do not knowingly collect data from minors.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-hux-dark mb-4">14. Third-Party Links</h2>
                <p>Our website may contain links to third-party sites.</p>
                <p>We are not responsible for their privacy practices.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-hux-dark mb-4">15. Marketing Communications</h2>
                <p>You may opt out of marketing emails at any time by:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Clicking "unsubscribe"</li>
                  <li>Contacting support</li>
                </ul>
                <p>Transactional and service-related communications may still be sent.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-hux-dark mb-4">16. Changes to This Policy</h2>
                <p>We may update this Privacy Policy periodically.</p>
                <p>Changes will be posted on this page with an updated "Last Updated" date.</p>
                <p>Continued use of HUX services indicates acceptance of the revised policy.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-hux-dark mb-4">17. Contact Information</h2>
                <p>For support, warranty, or complaints:</p>
                <p>📧 support@hux.co.in</p>
                <p>🏢 Viveon Gizit Pvt. Ltd., Electronic City, Bangalore, India</p>
              </section>

              <section className="bg-hux-turquoise/5 p-6 rounded-lg border border-hux-turquoise/20">
                <h2 className="text-2xl font-bold text-hux-dark mb-4">Acknowledgement</h2>
                <p>By using HUX products, services, or participating in our programs, you acknowledge that you have read and understood this Privacy Policy.</p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};