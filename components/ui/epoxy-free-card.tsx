import { Shield, Droplets, Heart, CheckCircle } from 'lucide-react';

export const EpoxyFreeCard = ({ className = "" }) => (
  <div className={`w-full rounded-xl border-2 border-neutral-400 bg-gradient-to-br from-neutral-100 via-stone-100 to-neutral-200 shadow-lg p-6 ${className}`}>
    <div className="flex items-center gap-3 mb-4">
      <div className="w-12 h-12 bg-gradient-to-r from-neutral-600 to-stone-600 rounded-xl flex items-center justify-center shadow-lg">
        <Shield className="text-white" size={22} />
      </div>
      <div>
        <h3 className="text-xl font-bold text-neutral-800">Epoxy-Free Revolution ⚡</h3>
        <p className="text-sm text-neutral-700">Advanced Construction</p>
      </div>
    </div>
    
    <p className="text-sm text-neutral-700 mb-4 leading-relaxed">
      The world's most advanced smart ring construction <strong>without compromising on durability or elegance</strong>
    </p>
    
    <div className="grid grid-cols-3 gap-3 mb-4">
      <div className="text-center">
        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
          <CheckCircle className="text-green-600" size={16} />
        </div>
        <span className="text-xs font-bold text-neutral-800">Longer Lasting</span>
      </div>
      <div className="text-center">
        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
          <Heart className="text-blue-600" size={16} />
        </div>
        <span className="text-xs font-bold text-neutral-800">Skin-Friendly</span>
      </div>
      <div className="text-center">
        <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center mx-auto mb-2">
          <Droplets className="text-cyan-600" size={16} />
        </div>
        <span className="text-xs font-bold text-neutral-800">Water Resistant</span>
      </div>
    </div>
    
    <div className="bg-neutral-200/50 rounded-lg p-3 mb-3">
      <h4 className="font-bold text-neutral-800 text-sm mb-1">No Epoxy. No Compromise.</h4>
      <p className="text-xs text-neutral-600 leading-relaxed">
        Traditional smart rings use epoxy resins that can degrade over time, trap moisture, and cause skin irritation.
      </p>
    </div>
    
    <div className="w-full h-1 bg-gradient-to-r from-neutral-400 to-stone-400 rounded-full"></div>
  </div>
);