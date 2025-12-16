import React from 'react';
import { Sparkles, Award, Shield } from 'lucide-react';

interface GoldCoatingCardProps {
  className?: string;
}

export const GoldCoatingCard: React.FC<GoldCoatingCardProps> = ({ className = "" }) => {
  return (
    <div className={`w-full rounded-xl border-2 border-yellow-300 bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 shadow-lg p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-r from-yellow-600 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
          <Sparkles className="text-white" size={22} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-yellow-800">Pure 18K Gold Coating ✨</h3>
          <p className="text-sm text-yellow-700">India's First Innovation</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-yellow-700 mb-4 leading-relaxed">
        India's first smart ring with <strong>pure 18-carat gold coating</strong> and revolutionary 
        <strong> epoxy-free construction</strong> for both inner ring and outer shell.
      </p>

      {/* Features Grid */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="text-center">
          <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Shield className="text-red-600" size={16} />
          </div>
          <span className="text-xs font-bold text-yellow-800">No Epoxy</span>
        </div>
        <div className="text-center">
          <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Award className="text-yellow-600" size={16} />
          </div>
          <span className="text-xs font-bold text-yellow-800">18K Gold PVD</span>
        </div>
        <div className="text-center">
          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            <span className="text-orange-600 font-bold text-sm">🇮🇳</span>
          </div>
          <span className="text-xs font-bold text-yellow-800">India First</span>
        </div>
      </div>

      {/* Bottom highlight */}
      <div className="w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-full"></div>
    </div>
  );
};