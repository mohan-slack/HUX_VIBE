import React, { useEffect, useState, memo, useCallback } from 'react';
import { Heart, Brain, Thermometer, Activity, Droplets, Battery, Zap } from 'lucide-react';

type HealthFeatureType = 'heart' | 'brain' | 'temperature' | 'activity' | 'water' | 'battery' | 'stress';

interface HealthFeatureConfig {
  id: string;
  orbitRadius: number;
  size: number;
  speed: number;
  iconType: HealthFeatureType;
  phaseShift: number;
  glowColor: 'turquoise' | 'gold';
  label: string;
}

interface OrbitingFeatureProps {
  config: HealthFeatureConfig;
  angle: number;
  isPaused: boolean;
  isMobile: boolean;
}

const healthIcons: Record<HealthFeatureType, { component: React.ComponentType<any>; color: string }> = {
  heart: { component: Heart, color: '#ef4444' },
  brain: { component: Brain, color: '#8b5cf6' },
  temperature: { component: Thermometer, color: '#f97316' },
  activity: { component: Activity, color: '#10b981' },
  water: { component: Droplets, color: '#06b6d4' },
  battery: { component: Battery, color: '#84cc16' },
  stress: { component: Zap, color: '#f59e0b' }
};

const baseHealthFeaturesConfig: HealthFeatureConfig[] = [
  { id: 'heart', orbitRadius: 120, size: 60, speed: 1, iconType: 'heart', phaseShift: 0, glowColor: 'turquoise', label: 'Heart Rate' },
  { id: 'brain', orbitRadius: 120, size: 55, speed: 1, iconType: 'brain', phaseShift: (2 * Math.PI) / 7, glowColor: 'turquoise', label: 'HRV & Sleep' },
  { id: 'temperature', orbitRadius: 120, size: 58, speed: 1, iconType: 'temperature', phaseShift: (4 * Math.PI) / 7, glowColor: 'turquoise', label: 'Temperature' },
  { id: 'stress', orbitRadius: 120, size: 56, speed: 1, iconType: 'stress', phaseShift: (6 * Math.PI) / 7, glowColor: 'turquoise', label: 'Stress & Recovery' },
  { id: 'water', orbitRadius: 180, size: 62, speed: -0.6, iconType: 'water', phaseShift: 0, glowColor: 'gold', label: '5ATM Waterproof' },
  { id: 'battery', orbitRadius: 180, size: 58, speed: -0.6, iconType: 'battery', phaseShift: (2 * Math.PI) / 3, glowColor: 'gold', label: '7+ Day Battery' },
  { id: 'activity', orbitRadius: 180, size: 60, speed: -0.6, iconType: 'activity', phaseShift: (4 * Math.PI) / 3, glowColor: 'gold', label: 'Activity Tracking' }
];

const OrbitingFeature = memo(({ config, angle, isPaused, isMobile }: OrbitingFeatureProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { orbitRadius, size, iconType, label } = config;
  const IconComponent = healthIcons[iconType].component;
  const iconColor = healthIcons[iconType].color;

  const adjustedRadius = orbitRadius * (isMobile ? 0.7 : 1);
  const adjustedSize = size * (isMobile ? 0.7 : 1);
  const x = Math.cos(angle) * adjustedRadius;
  const y = Math.sin(angle) * adjustedRadius;

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  return (
    <div
      className="absolute top-1/2 left-1/2 transition-all duration-300 ease-out will-change-transform"
      style={{
        width: `${adjustedSize}px`,
        height: `${adjustedSize}px`,
        transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
        zIndex: isHovered ? 20 : 10,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`
          relative w-full h-full p-2 glass-morphism tech-border
          rounded-full flex items-center justify-center
          transition-all duration-300 cursor-pointer
          ${isHovered && !isPaused ? 'scale-110' : 'hover:scale-105'}
        `}
        style={{
          boxShadow: isHovered && !isPaused
            ? `0 0 20px ${iconColor}40, 0 0 40px ${iconColor}20`
            : undefined
        }}
      >
        <IconComponent 
          size={adjustedSize * 0.4} 
          className="text-white"
          style={{ color: iconColor }}
        />
        {isHovered && (
          <div className="absolute -bottom-6 md:-bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 glass-morphism rounded text-xs text-white whitespace-nowrap pointer-events-none z-30 opacity-90">
            {label}
          </div>
        )}
      </div>
    </div>
  );
});
OrbitingFeature.displayName = 'OrbitingFeature';

const GlowingOrbitPath = memo(({ radius, glowColor, isMobile }: { radius: number; glowColor: 'turquoise' | 'gold'; isMobile: boolean }) => {
  const colors = {
    turquoise: {
      primary: 'rgba(2, 179, 217, 0.3)',
      secondary: 'rgba(2, 179, 217, 0.15)',
      border: 'rgba(2, 179, 217, 0.2)'
    },
    gold: {
      primary: 'rgba(212, 175, 55, 0.3)',
      secondary: 'rgba(212, 175, 55, 0.15)',
      border: 'rgba(212, 175, 55, 0.2)'
    }
  };

  const colorSet = colors[glowColor];
  const adjustedRadius = radius * (isMobile ? 0.7 : 1);

  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none will-change-transform"
      style={{
        width: `${adjustedRadius * 2}px`,
        height: `${adjustedRadius * 2}px`,
      }}
    >
      <div
        className="absolute inset-0 rounded-full animate-pulse"
        style={{
          background: `radial-gradient(circle, transparent 40%, ${colorSet.secondary} 80%, ${colorSet.primary} 100%)`,
          boxShadow: `0 0 40px ${colorSet.primary}`,
          animation: 'pulse 4s ease-in-out infinite',
        }}
      />
      <div
        className="absolute inset-0 rounded-full"
        style={{
          border: `1px solid ${colorSet.border}`,
        }}
      />
    </div>
  );
});
GlowingOrbitPath.displayName = 'GlowingOrbitPath';

export default function OrbitingHealthFeatures() {
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isPaused) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      setTime(prevTime => prevTime + deltaTime * (isMobile ? 0.7 : 1));
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, isMobile]);

  const handleMouseEnter = useCallback(() => setIsPaused(true), []);
  const handleMouseLeave = useCallback(() => setIsPaused(false), []);

  const containerSize = isMobile ? 300 : 500;
  const ringSize = isMobile ? 20 : 28;

  return (
    <div className="w-full flex items-center justify-center overflow-hidden py-8 md:py-12 lg:py-16">
      <div 
        className="relative flex items-center justify-center"
        style={{ width: `${containerSize}px`, height: `${containerSize}px` }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        
        {/* Central Smart Ring */}
        <div className={`w-${ringSize} h-${ringSize} rounded-full flex items-center justify-center z-10 relative`}>
          <div className="absolute inset-0 rounded-full bg-hux-turquoise/20 blur-lg animate-pulse"></div>
          <div className="absolute inset-0 rounded-full bg-hux-gold/15 blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <img 
            src="/hux-ring.png" 
            alt="HUX Smart Ring" 
            className={`relative z-10 w-${ringSize - 4} h-${ringSize - 4} rounded-full object-cover`}
            loading="lazy"
          />
        </div>

        {/* Render glowing orbit paths */}
        <GlowingOrbitPath radius={120} glowColor="turquoise" isMobile={isMobile} />
        <GlowingOrbitPath radius={180} glowColor="gold" isMobile={isMobile} />

        {/* Render orbiting health feature icons */}
        {baseHealthFeaturesConfig.map((config) => {
          const angle = time * config.speed + (config.phaseShift || 0);
          return (
            <OrbitingFeature
              key={config.id}
              config={config}
              angle={angle}
              isPaused={isPaused}
              isMobile={isMobile}
            />
          );
        })}
      </div>
    </div>
  );
}