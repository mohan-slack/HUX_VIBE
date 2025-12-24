'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
  Battery,
  Sliders,
  ChevronRight,
  Zap,
  Bluetooth,
  Wifi,
  Heart,
  LucideIcon,
  Sparkles,
  Shield,
  Droplets,
  Star,
} from 'lucide-react';

// =========================================
// 1. CONFIGURATION & DATA TYPES
// =========================================

export type RingVariant = 'sterling-gold' | 'tarnish-grey';

export interface FeatureMetric {
  label: string;
  value: number; // 0-100
  icon: LucideIcon;
}

export interface RingData {
  id: RingVariant;
  label: string; // Display name for the switcher
  title: string;
  description: string;
  image: string;
  colors: {
    gradient: string; // Tailwind gradient classes
    glow: string;     // Tailwind color class for accents
    ring: string;     // Tailwind border color for rings
    accent: string;   // Accent color for UI elements
  };
  stats: {
    batteryLevel: number;
    waterResistance: string;
  };
  features: FeatureMetric[];
}

// HUX Ring Data Configuration
const RING_DATA: Record<RingVariant, RingData> = {
  'sterling-gold': {
    id: 'sterling-gold',
    label: 'Sterling Gold',
    title: 'Luxury Redefined',
    description: '18K gold coating with epoxy-free design',
    image: '/images/svgPlainRings/ring-angle-4.png',
    colors: {
      gradient: 'from-yellow-600 to-amber-600',
      glow: 'bg-yellow-500',
      ring: 'border-l-yellow-500/50',
      accent: 'text-yellow-600',
    },
    stats: { batteryLevel: 85, waterResistance: '5ATM' },
    features: [
      { label: '18K Gold PVD', value: 100, icon: Sparkles },
      { label: 'Epoxy-Free', value: 100, icon: Shield },
      { label: 'Skin-Friendly', value: 98, icon: Heart },
    ],
  },
  'tarnish-grey': {
    id: 'tarnish-grey',
    label: 'Tarnish Grey',
    title: 'Corrosion-resistant alloy',
    description: 'Raw strength. Refined design.',
    image: '/images/svgPlainRings/ring-angle-3.png',
    colors: {
      gradient: 'from-slate-600 to-gray-700',
      glow: 'bg-slate-500',
      ring: 'border-r-slate-500/50',
      accent: 'text-slate-600',
    },
    stats: { batteryLevel: 82, waterResistance: '5ATM' },
    features: [
      { label: 'Durability', value: 95, icon: Shield },
      { label: 'Water Resist', value: 100, icon: Droplets },
      { label: 'Precision', value: 92, icon: Star },
    ],
  },
};

// =========================================
// 2. ANIMATION VARIANTS
// =========================================

const ANIMATIONS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { type: 'spring', stiffness: 100, damping: 20 },
    },
    exit: { opacity: 0, y: -10, filter: 'blur(5px)' },
  },
  image: (isGold: boolean): Variants => ({
    initial: {
      opacity: 0,
      scale: 1.5,
      filter: 'blur(15px)',
      rotate: isGold ? -30 : 30,
      x: isGold ? -80 : 80,
    },
    animate: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      rotate: 0,
      x: 0,
      transition: { type: 'spring', stiffness: 260, damping: 20 },
    },
    exit: {
      opacity: 0,
      scale: 0.6,
      filter: 'blur(20px)',
      transition: { duration: 0.25 },
    },
  }),
};

// =========================================
// 3. SUB-COMPONENTS
// =========================================

const BackgroundGradient = ({ isGold }: { isGold: boolean }) => (
  <div className="fixed inset-0 pointer-events-none">
    <motion.div
      animate={{
        background: isGold
          ? 'radial-gradient(circle at 0% 50%, rgba(251, 191, 36, 0.15), transparent 50%)'
          : 'radial-gradient(circle at 100% 50%, rgba(100, 116, 139, 0.15), transparent 50%)',
      }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0"
    />
  </div>
);

const RingVisual = ({ data, isGold }: { data: RingData; isGold: boolean }) => (
  <motion.div layout="position" className="relative group shrink-0">
    {/* Animated Rings */}
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      className={`absolute inset-[-20%] rounded-full border border-dashed border-white/10 ${data.colors.ring}`}
    />
    <motion.div
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      className={`absolute inset-0 rounded-full bg-gradient-to-br ${data.colors.gradient} blur-2xl opacity-40`}
    />

    {/* Image Container */}
    <div className="relative h-52 w-52 md:h-64 md:w-64 rounded-full border border-white/5 shadow-2xl flex items-center justify-center overflow-hidden bg-hux-ivory/20 backdrop-blur-sm">
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
        className="relative z-10 w-full h-full flex items-center justify-center"
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={data.id}
            src={data.image}
            alt={`HUX Smart Ring ${data.title}`}
            variants={ANIMATIONS.image(isGold)}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-4"
            draggable={false}
          />
        </AnimatePresence>
      </motion.div>
    </div>

    {/* Status Labels */}
    <motion.div
      layout="position"
      className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
    >
      <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-hux-dark bg-white/80 px-4 py-2 rounded-full border border-hux-turquoise/20 backdrop-blur">
        <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
        {isGold ? 'Smart Touch' : 'Silent SOS'}
      </div>
    </motion.div>
    <motion.div
      layout="position"
      className={`absolute top-1/2 -translate-y-1/2 whitespace-nowrap ${isGold ? '-left-16' : '-right-20'}`}
    >
      <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-hux-dark bg-white/80 px-4 py-2 rounded-full border border-hux-turquoise/20 backdrop-blur">
        <span className="h-1.5 w-1.5 rounded-full bg-purple-500 animate-pulse" />
        {isGold ? 'Haptic Cue' : 'Life Metrics'}
      </div>
    </motion.div>
    <motion.div
      layout="position"
      className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
    >
      <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-hux-dark bg-white/80 px-4 py-2 rounded-full border border-hux-turquoise/20 backdrop-blur">
        <span className={`h-1.5 w-1.5 rounded-full ${data.colors.glow} animate-pulse`} />
        {isGold ? 'AI Insights' : 'Daylong Endurance'}
      </div>
    </motion.div>
  </motion.div>
);

const RingDetails = ({ data, isGold }: { data: RingData; isGold: boolean }) => {
  const alignClass = isGold ? 'items-start text-left' : 'items-end text-right';
  const flexDirClass = isGold ? 'flex-row' : 'flex-row-reverse';
  const barColorClass = isGold ? 'left-0 bg-yellow-500' : 'right-0 bg-slate-500';

  return (
    <motion.div
      variants={ANIMATIONS.container}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`flex flex-col ${alignClass}`}
    >
      <motion.h2 variants={ANIMATIONS.item} className="text-sm font-bold uppercase tracking-[0.2em] text-hux-turquoise mb-2">
        {data.label}
      </motion.h2>
      <motion.h1 variants={ANIMATIONS.item} className="text-2xl md:text-3xl font-display font-bold tracking-tight mb-2 text-hux-dark">
        {data.title}
      </motion.h1>
      <motion.p variants={ANIMATIONS.item} className={`text-neutral-600 mb-8 max-w-sm leading-relaxed ${isGold ? 'mr-auto' : 'ml-auto'}`}>
        {data.description}
      </motion.p>

      {/* Feature Grid */}
      <motion.div variants={ANIMATIONS.item} className="w-full space-y-6 bg-white/40 p-6 rounded-2xl border border-hux-turquoise/10 backdrop-blur-sm shadow-lg">
        {data.features.map((feature, idx) => (
          <div key={feature.label} className="group">
            <div className={`flex items-center justify-between mb-3 text-sm ${flexDirClass}`}>
              <div className={`flex items-center gap-2 ${feature.value > 50 ? 'text-hux-dark' : 'text-neutral-500'}`}>
                <feature.icon size={16} /> <span className="font-medium">{feature.label}</span>
              </div>
              <span className="font-mono text-xs text-neutral-500">{feature.value}%</span>
            </div>
            <div className="relative h-2 w-full bg-neutral-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${feature.value}%` }}
                transition={{ duration: 1, delay: 0.4 + idx * 0.15 }}
                className={`absolute top-0 bottom-0 ${barColorClass} opacity-80 rounded-full`}
              />
            </div>
          </div>
        ))}

        <div className={`pt-4 flex ${isGold ? 'justify-start' : 'justify-end'}`}>
          <button 
            type="button" 
            onClick={() => {
              const specsSection = document.getElementById('specs');
              if (specsSection) {
                specsSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-hux-turquoise hover:text-hux-turquoiseDark transition-colors group"
          >
            <Sliders size={14} /> View Specs
            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </motion.div>

      {/* Battery */}
      <motion.div variants={ANIMATIONS.item} className={`mt-6 flex items-center gap-3 text-neutral-600 ${flexDirClass}`}>
        <Battery size={16} />
        <span className="text-sm font-medium">7+ Day Battery</span>
      </motion.div>
    </motion.div>
  );
};

const RingSwitcher = ({ 
  activeId, 
  onToggle 
}: { 
  activeId: RingVariant; 
  onToggle: (id: RingVariant) => void 
}) => {
  const options = Object.values(RING_DATA).map(p => ({ id: p.id, label: p.label }));

  return (
    <div className="flex justify-center mt-12">
      <motion.div layout className="flex items-center gap-1 p-1.5 rounded-full bg-white/80 backdrop-blur-2xl border border-hux-turquoise/20 shadow-[0_20px_60px_rgba(0,0,0,0.1)] ring-1 ring-hux-turquoise/5">
        {options.map((opt) => (
          <motion.button
            key={opt.id}
            onClick={() => onToggle(opt.id)}
            whileTap={{ scale: 0.96 }}
            className="relative w-28 h-12 rounded-full flex items-center justify-center text-sm font-medium focus:outline-none"
          >
            {activeId === opt.id && (
              <motion.div
                layoutId="ring-surface"
                className="absolute inset-0 rounded-full bg-gradient-to-b from-hux-turquoise/10 to-hux-turquoise/5 shadow-inner border border-hux-turquoise/20"
                transition={{ type: 'spring', stiffness: 220, damping: 22 }}
              />
            )}
            <span className={`relative z-10 transition-colors duration-300 ${activeId === opt.id ? 'text-hux-turquoise font-semibold' : 'text-neutral-600 hover:text-hux-turquoise'}`}>
              {opt.label}
            </span>
            {activeId === opt.id && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute -bottom-1 h-1 w-6 rounded-full bg-gradient-to-r from-transparent via-hux-turquoise/60 to-transparent"
              />
            )}
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
};

// =========================================
// 4. MAIN COMPONENT
// =========================================

export default function Ring360Showcase() {
  const [activeVariant, setActiveVariant] = useState<RingVariant>('sterling-gold');
  
  const currentData = RING_DATA[activeVariant];
  const isGold = activeVariant === 'sterling-gold';

  return (
    <section className="relative w-full bg-hux-ivory text-hux-dark overflow-hidden selection:bg-hux-turquoise selection:text-white py-12 mobile-corner-cut">
      
      <BackgroundGradient isGold={isGold} />

      {/* Section Header */}
      <div className="text-center mb-8 relative z-10">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-hux-dark leading-tight mb-4">
          360° of <span className="text-hux-turquoise">Perfection</span>
        </h2>
        <p className="text-base text-neutral-500 font-light max-w-xl mx-auto">
          Crafted from premium surgical-grade alloy with seamless, touch-free design.
        </p>
      </div>

      <main className="relative z-10 w-full px-6 max-w-7xl mx-auto">
        <motion.div
          layout
          transition={{ type: 'spring', bounce: 0, duration: 0.9 }}
          className={`flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 lg:gap-16 w-full ${
            isGold ? 'md:flex-row' : 'md:flex-row-reverse'
          }`}
        >
          {/* Ring Visual */}
          <RingVisual data={currentData} isGold={isGold} />

          {/* Ring Details */}
          <motion.div layout="position" className="w-full max-w-md">
            <AnimatePresence mode="wait">
              <RingDetails 
                key={activeVariant} // Key forces re-render for animation
                data={currentData} 
                isGold={isGold} 
              />
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </main>

      <RingSwitcher activeId={activeVariant} onToggle={setActiveVariant} />
    </section>
  );
}