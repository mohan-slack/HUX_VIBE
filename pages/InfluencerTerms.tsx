import React from 'react';
import { Link } from 'react-router-dom';

export const InfluencerTerms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-hux-ivory via-white to-stone-50 py-12 px-4 selection:bg-hux-dark selection:text-white">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-white/20 p-8 md:p-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-hux-dark mb-4">HUX Influencer Program – Terms & Conditions</h1>
            <p className="text-gray-600">Last Updated: [●]</p>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <p>
              These Terms & Conditions ("Terms") govern your participation in the HUX Influencer Program ("Program"), operated by Viveon Gizit Pvt. Ltd., doing business as HUX ("HUX", "Company", "we", "us", or "our").
            </p>

            <p>
              By applying to, accessing, or participating in the Program, you ("Creator", "Influencer", "you", or "your") acknowledge that you have read, understood, and agree to be bound by these Terms.
            </p>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-hux-dark mb-4">1. Program Purpose & Scope</h2>
                <p>The HUX Influencer Program is a creator collaboration initiative, not an employment, agency, franchise, or investment relationship.</p>
                <p>The Program is designed to:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Encourage authentic content creation based on real product experience</li>
                  <li>Enable creators to share their genuine perspective on HUX Smart Ring</li>
                  <li>Offer performance-based rewards for qualifying customer purchases</li>
                </ul>
                <p>Nothing in this Program creates an obligation for HUX to engage in ongoing collaboration with any Creator.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-hux-dark mb-4">2. Definitions</h2>
                <p>For clarity, the following definitions apply:</p>
                <div className="space-y-3">
                  <p><strong>"Qualifying Purchase":</strong> A completed customer order for eligible HUX products that is successfully paid, not canceled, refunded, returned, or charged back.</p>
                  <p><strong>"Reward":</strong> The monetary incentive earned by a Creator for qualifying purchases, calculated as a percentage of net purchase value.</p>
                  <p><strong>"Tracking Link / Code":</strong> A unique referral identifier issued to the Creator for attribution.</p>
                  <p><strong>"Net Purchase Value":</strong> Order value excluding taxes, shipping, handling, discounts, refunds, chargebacks, and failed payments.</p>
                  <p><strong>"Content":</strong> Any media created or shared by the Creator, including text, images, video, audio, or live streams.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-hux-dark mb-4">3. Eligibility Requirements</h2>
                <p>To participate, you must:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Be 18 years of age or older</li>
                  <li>Have at least one active content platform (social media, blog, website, or newsletter)</li>
                  <li>Create original content relevant to health, lifestyle, technology, fitness, or design</li>
                  <li>Comply with all applicable local, national, and international laws</li>
                </ul>
                <p>HUX reserves the unrestricted right to:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Approve or reject applications</li>
                  <li>Request additional verification</li>
                  <li>Reassess eligibility at any time</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-hux-dark mb-4">4. Independent Contractor Relationship</h2>
                <p>You acknowledge and agree that:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>You are an independent contractor</li>
                  <li>You are not an employee, agent, representative, or partner of HUX</li>
                  <li>You have no authority to bind or represent HUX in any manner</li>
                  <li>Nothing in these Terms creates an employment, joint venture, partnership, or fiduciary relationship.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-hux-dark mb-4">5. Creator Responsibilities & Conduct</h2>
                <p>Creators must:</p>
                
                <h3 className="text-xl font-semibold text-hux-dark mt-6 mb-3">5.1 Authentic Representation</h3>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Base content on real use or honest opinion</li>
                  <li>Avoid misleading, exaggerated, or false claims</li>
                  <li>Avoid medical or diagnostic claims unless explicitly approved in writing</li>
                </ul>

                <h3 className="text-xl font-semibold text-hux-dark mt-6 mb-3">5.2 Prohibited Conduct</h3>
                <p>Creators may not:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Make health or medical guarantees</li>
                  <li>Misrepresent pricing, availability, or features</li>
                  <li>Use deceptive traffic practices (spam, bots, click farms)</li>
                  <li>Impersonate HUX employees or customer support</li>
                  <li>Bid on HUX brand keywords in paid advertising</li>
                  <li>Register domains or social handles resembling HUX branding</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-hux-dark mb-4">6. Content Guidelines</h2>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Content must be original and creator-owned</li>
                  <li>Content must not be defamatory, unlawful, offensive, or misleading</li>
                  <li>Comparisons with competitors must be factual and non-deceptive</li>
                  <li>HUX branding must be used only as provided or approved</li>
                </ul>
                <p>HUX reserves the right to request content edits or removal if brand integrity is compromised.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-hux-dark mb-4">7. Disclosure & Compliance Obligations</h2>
                <p>Creators must:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Clearly disclose their relationship with HUX where required</li>
                  <li>Follow platform-specific disclosure rules (e.g., FTC, ASCI, ASA, EU guidelines)</li>
                </ul>
                <p>Accepted disclosure examples:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>#HUXPartner</li>
                  <li>#HUXCreator</li>
                  <li>#Ad (where legally required)</li>
                </ul>
                <p>Failure to disclose properly may result in immediate suspension.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-hux-dark mb-4">8. Rewards, Attribution & Tracking</h2>
                
                <h3 className="text-xl font-semibold text-hux-dark mt-6 mb-3">8.1 Reward Structure</h3>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Creators may earn up to 8% on qualifying purchases</li>
                  <li>Rates may vary by product, campaign, region, or time period</li>
                </ul>

                <h3 className="text-xl font-semibold text-hux-dark mt-6 mb-3">8.2 Attribution</h3>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Attribution is determined solely by HUX's tracking systems</li>
                  <li>HUX's data shall be final and binding in case of disputes</li>
                </ul>

                <h3 className="text-xl font-semibold text-hux-dark mt-6 mb-3">8.3 Exclusions</h3>
                <p>Rewards do not apply to:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Returned or refunded orders</li>
                  <li>Taxes, shipping, or handling</li>
                  <li>Fraudulent or suspicious transactions</li>
                  <li>Internal purchases or self-referrals (unless approved)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-hux-dark mb-4">9. Payouts & Taxes</h2>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Payout schedules, thresholds, and methods will be communicated separately</li>
                  <li>Creators are responsible for all taxes, reporting, and compliance</li>
                  <li>HUX may request tax documentation where legally required</li>
                  <li>HUX shall not be responsible for Creator tax liabilities.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-hux-dark mb-4">10. Brand Assets & Intellectual Property</h2>
                
                <h3 className="text-xl font-semibold text-hux-dark mt-6 mb-3">10.1 HUX IP</h3>
                <p>All trademarks, logos, product designs, and proprietary materials remain the exclusive property of HUX.</p>

                <h3 className="text-xl font-semibold text-hux-dark mt-6 mb-3">10.2 License to Use</h3>
                <p>HUX grants a limited, revocable, non-exclusive license to use approved assets solely for Program participation.</p>

                <h3 className="text-xl font-semibold text-hux-dark mt-6 mb-3">10.3 Creator Content Rights</h3>
                <p>Creators retain ownership of their content but grant HUX a royalty-free, worldwide license to reuse, repost, and display content for marketing and promotional purposes, unless opted out in writing.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-hux-dark mb-4">11. Confidentiality</h2>
                <p>Creators may receive confidential information including:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Product roadmaps</li>
                  <li>Pricing strategies</li>
                  <li>Launch timelines</li>
                </ul>
                <p>Such information must not be disclosed without written consent and remains confidential even after Program termination.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-hux-dark mb-4">12. Program Modifications</h2>
                <p>HUX reserves the right to:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Modify reward rates or eligibility</li>
                  <li>Add or remove Program features</li>
                  <li>Update these Terms at any time</li>
                </ul>
                <p>Continued participation constitutes acceptance of updated Terms.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-hux-dark mb-4">13. Suspension & Termination</h2>
                <p>HUX may suspend or terminate participation immediately if:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>These Terms are violated</li>
                  <li>Fraud, abuse, or unethical behavior is suspected</li>
                  <li>Creator actions harm the brand or customers</li>
                </ul>
                <p>Creators may terminate participation at any time by written notice.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-hux-dark mb-4">14. Limitation of Liability</h2>
                <p>To the maximum extent permitted by law:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>HUX shall not be liable for indirect, incidental, or consequential damages</li>
                  <li>Total liability shall not exceed rewards paid to the Creator in the previous 3 months</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-hux-dark mb-4">15. Indemnification</h2>
                <p>Creators agree to indemnify and hold harmless HUX from claims arising out of:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Creator content</li>
                  <li>Legal non-compliance</li>
                  <li>Misrepresentation or breach of these Terms</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-hux-dark mb-4">16. Governing Law & Jurisdiction</h2>
                <p>These Terms are governed by the laws of India.</p>
                <p>All disputes shall be subject to the exclusive jurisdiction of courts located in [City, India].</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-hux-dark mb-4">17. Contact Information</h2>
                <p>For support, warranty, or complaints:</p>
                <p>📧 support@hux.co.in</p>
                <p>🏢 Viveon Gizit Pvt. Ltd., Electronic City, Bangalore, India</p>
              </section>

              <section className="bg-hux-turquoise/5 p-6 rounded-lg border border-hux-turquoise/20">
                <h2 className="text-2xl font-bold text-hux-dark mb-4">Acceptance</h2>
                <p>By clicking "Apply", "Join", or participating in the Program, you confirm that you have read, understood, and agree to these Terms & Conditions.</p>
              </section>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/influencers" className="text-hux-turquoise hover:underline font-medium">
              ← Back to Influencer Program
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};