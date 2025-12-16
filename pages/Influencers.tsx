import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, Megaphone, DollarSign, TrendingUp, Users, Link as LinkIcon, BarChart3, Headphones, Mail, FileText, Shield, X } from 'lucide-react';
import { FeaturesSectionWithHoverEffects } from '../components/ui/feature-section-with-hover-effects';
import { InfluencerStepsWithEffects } from '../components/ui/influencer-steps-with-effects';
import { Button } from '../components/Button';

export const Influencers = () => {
  const [showGuidelines, setShowGuidelines] = useState(false);
  const [showRewards, setShowRewards] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-br from-hux-ivory via-white to-stone-50 selection:bg-hux-dark selection:text-white">
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-sm font-bold text-hux-turquoise uppercase tracking-widest">Amplify HUX's Innovation</p>
                <h1 className="text-5xl md:text-6xl font-display font-bold text-hux-dark leading-tight">
                  Earn 8% by sharing what you genuinely use
                </h1>
                <p className="text-xl text-neutral-600 leading-relaxed">
                  Join the HUX Influencer Program and collaborate with a premium smart-ring brand shaping the future of personal health.
                </p>
              </div>
              <Link to="/influencer-signup">
                <Button className="bg-gradient-to-r from-hux-turquoise to-hux-turquoiseLight text-white px-8 py-4 text-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  Apply to Collaborate
                </Button>
              </Link>
            </div>

            {/* Right Illustration */}
            <div className="relative">
              <div className="bg-gradient-to-br from-hux-turquoise/10 to-hux-gold/10 rounded-3xl p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-hux-turquoise/20 rounded-full blur-2xl"></div>
                <div className="relative z-10 flex items-center justify-center">
                  <div className="text-center space-y-6">
                    <div className="flex items-center justify-center mb-4">
                      <img src="/images/svgPlainRings/ring-angle-3.png" alt="HUX Ring" className="w-16 h-16 object-contain" />
                    </div>
                    <div className="space-y-2">
                      <div className="text-4xl font-bold text-hux-dark">8%</div>
                      <div className="text-lg text-neutral-600">Creator Reward Rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-hux-dark mb-4">How it works</h2>
            <p className="text-xl text-neutral-600">A collaboration-first approach built for creators, not advertisers.</p>
          </div>

          <InfluencerStepsWithEffects setShowRewards={setShowRewards} setShowGuidelines={setShowGuidelines} />

          {/* CTA Button */}
          <div className="flex flex-col items-center mt-12">
            <Link to="/influencer-signup">
              <Button className="bg-gradient-to-r from-hux-turquoise to-hux-turquoiseLight text-white px-12 py-4 text-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Start Earning Today
              </Button>
            </Link>
            <p className="text-xs text-neutral-500 mt-4">
              Rewards are issued on qualifying purchases. Program terms apply.
            </p>
          </div>
        </div>
      </section>

      {/* Footer Links */}
      <footer className="py-16 bg-neutral-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Learn */}
            <div>
              <h4 className="font-bold text-hux-dark mb-4">Learn</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-neutral-600 hover:text-hux-turquoise transition-colors flex items-center gap-2"><BarChart3 size={16} />Commissions</a></li>
                <li><a href="#" className="text-neutral-600 hover:text-hux-turquoise transition-colors flex items-center gap-2"><LinkIcon size={16} />Tools</a></li>
                <li><a href="#" className="text-neutral-600 hover:text-hux-turquoise transition-colors flex items-center gap-2"><BarChart3 size={16} />Reporting</a></li>
              </ul>
            </div>

            {/* Customer Support */}
            <div>
              <h4 className="font-bold text-hux-dark mb-4">Customer Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-neutral-600 hover:text-hux-turquoise transition-colors flex items-center gap-2"><Mail size={16} />Contact us</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-bold text-hux-dark mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="/influencer-terms" className="text-neutral-600 hover:text-hux-turquoise transition-colors flex items-center gap-2"><FileText size={16} />Terms & Conditions</a></li>
                <li><a href="/privacy-policy" className="text-neutral-600 hover:text-hux-turquoise transition-colors flex items-center gap-2"><Shield size={16} />Privacy Policy</a></li>
              </ul>
            </div>

            {/* Copyright */}
            <div>
              <p className="text-sm text-neutral-500">©2025, HUX Smart Ring</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Creator Guidelines Modal */}
      {showGuidelines && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-hux-dark font-display">Creator Guidelines</h2>
              <button 
                onClick={() => setShowGuidelines(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-600" />
              </button>
            </div>
            <FeaturesSectionWithHoverEffects />
          </div>
        </div>
      )}

      {/* Rewards Modal */}
      {showRewards && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-hux-dark font-display">Creator Rewards</h2>
              <button 
                onClick={() => setShowRewards(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-600" />
              </button>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-hux-turquoise/5 to-transparent rounded-2xl p-6 border border-hux-turquoise/20 hover:shadow-lg transition-all duration-300 group">
                    <h3 className="text-xl font-bold text-hux-dark mb-4 group-hover:text-hux-turquoise transition-colors">Creator Rewards</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2"><span className="text-hux-turquoise mt-1">•</span> Up to 8% reward share on qualifying HUX Smart Ring purchases</li>
                      <li className="flex items-start gap-2"><span className="text-hux-turquoise mt-1">•</span> Rewards tracked via your unique link or creator code</li>
                      <li className="flex items-start gap-2"><span className="text-hux-turquoise mt-1">•</span> Transparent tracking and payout history</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-hux-gold/5 to-transparent rounded-2xl p-6 border border-hux-gold/20 hover:shadow-lg transition-all duration-300 group">
                    <h3 className="text-xl font-bold text-hux-dark mb-4 group-hover:text-hux-gold transition-colors">Product Privileges</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2"><span className="text-hux-gold mt-1">•</span> Early access to upcoming HUX models</li>
                      <li className="flex items-start gap-2"><span className="text-hux-gold mt-1">•</span> Priority invitations for limited or exclusive drops</li>
                      <li className="flex items-start gap-2"><span className="text-hux-gold mt-1">•</span> Opportunities to receive test units or previews (where applicable)</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-blue-500/5 to-transparent rounded-2xl p-6 border border-blue-500/20 hover:shadow-lg transition-all duration-300 group">
                    <h3 className="text-xl font-bold text-hux-dark mb-4 group-hover:text-blue-600 transition-colors">Collaboration Opportunities</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> Long-term creator partnerships (not one-off promotions)</li>
                      <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> Feature opportunities on HUX website, social channels, or campaigns</li>
                      <li className="flex items-start gap-2"><span className="text-blue-500 mt-1">•</span> Invitations to brand initiatives, launches, or community programs</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-green-500/5 to-transparent rounded-2xl p-6 border border-green-500/20 hover:shadow-lg transition-all duration-300 group">
                    <h3 className="text-xl font-bold text-hux-dark mb-4 group-hover:text-green-600 transition-colors">Creator Experience</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2"><span className="text-green-500 mt-1">•</span> No minimum posting requirements</li>
                      <li className="flex items-start gap-2"><span className="text-green-500 mt-1">•</span> No forced scripts or messaging</li>
                      <li className="flex items-start gap-2"><span className="text-green-500 mt-1">•</span> Creative freedom with brand-aligned guidelines</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-gradient-to-br from-gray-50 to-transparent rounded-2xl p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-hux-dark mb-4">Payout & Transparency</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2"><span className="text-gray-500 mt-1">•</span> Rewards issued on qualifying purchases only</li>
                  <li className="flex items-start gap-2"><span className="text-gray-500 mt-1">•</span> Excludes returns, refunds, taxes, and shipping</li>
                  <li className="flex items-start gap-2"><span className="text-gray-500 mt-1">•</span> Payout timelines and methods clearly communicated</li>
                </ul>
                <p className="text-xs text-gray-500 mt-4 italic">
                  Rewards, access, and collaboration opportunities may vary by creator profile and program phase.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};