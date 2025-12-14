import React, { useEffect, useState, memo } from 'react';
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

const healthFeaturesConfig: HealthFeatureConfig[] = [
  { id: 'heart', orbitRadius: 120, size: 70, speed: 1, iconType: 'heart', phaseShift: 0, glowColor: 'turquoise', label: 'Heart Rate' },
  { id: 'brain', orbitRadius: 120, size: 65, speed: 1, iconType: 'brain', phaseShift: (2 * Math.PI) / 7, glowColor: 'turquoise', label: 'HRV & Sleep' },
  { id: 'temperature', orbitRadius: 120, size: 68, speed: 1, iconType: 'temperature', phaseShift: (4 * Math.PI) / 7, glowColor: 'turquoise', label: 'Temperature' },
  { id: 'stress', orbitRadius: 120, size: 66, speed: 1, iconType: 'stress', phaseShift: (6 * Math.PI) / 7, glowColor: 'turquoise', label: 'Stress & Recovery' },
  { id: 'water', orbitRadius: 200, size: 72, speed: -0.6, iconType: 'water', phaseShift: 0, glowColor: 'gold', label: '5ATM Waterproof' },
  { id: 'battery', orbitRadius: 200, size: 68, speed: -0.6, iconType: 'battery', phaseShift: (2 * Math.PI) / 3, glowColor: 'gold', label: '7+ Day Battery' },
  { id: 'activity', orbitRadius: 200, size: 70, speed: -0.6, iconType: 'activity', phaseShift: (4 * Math.PI) / 3, glowColor: 'gold', label: 'Activity Tracking' }
];

const OrbitingFeature = memo(({ config, angle }: OrbitingFeatureProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { orbitRadius, size, iconType, label } = config;
  const IconComponent = healthIcons[iconType].component;
  const iconColor = healthIcons[iconType].color;

  const x = Math.cos(angle) * orbitRadius;
  const y = Math.sin(angle) * orbitRadius;

  return (
    <div
      className="absolute top-1/2 left-1/2 transition-all duration-300 ease-out"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
        zIndex: isHovered ? 20 : 10,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`
          relative w-full h-full p-3 glass-morphism tech-border
          rounded-full flex items-center justify-center
          transition-all duration-300 cursor-pointer neon-glow
          ${isHovered ? 'scale-125 floating-ring' : 'hover:scale-110'}
        `}
        style={{
          boxShadow: isHovered
            ? `0 0 30px ${iconColor}60, 0 0 60px ${iconColor}30`
            : undefined
        }}
      >
        <IconComponent 
          size={size * 0.5} 
          className="text-white"
          style={{ color: iconColor }}
        />
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 glass-morphism rounded text-xs text-white whitespace-nowrap pointer-events-none z-30 opacity-90">
          {label}
        </div>
      </div>
    </div>
  );
});
OrbitingFeature.displayName = 'OrbitingFeature';

const GlowingOrbitPath = memo(({ radius, glowColor, animationDelay = 0 }: { radius: number; glowColor: 'turquoise' | 'gold'; animationDelay?: number }) => {
  const colors = {
    turquoise: {
      primary: 'rgba(2, 179, 217, 0.4)',
      secondary: 'rgba(2, 179, 217, 0.2)',
      border: 'rgba(2, 179, 217, 0.3)'
    },
    gold: {
      primary: 'rgba(212, 175, 55, 0.4)',
      secondary: 'rgba(212, 175, 55, 0.2)',
      border: 'rgba(212, 175, 55, 0.3)'
    }
  };

  const colorSet = colors[glowColor];

  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
      style={{
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
        animationDelay: `${animationDelay}s`,
      }}
    >
      <div
        className="absolute inset-0 rounded-full animate-pulse"
        style={{
          background: `radial-gradient(circle, transparent 30%, ${colorSet.secondary} 70%, ${colorSet.primary} 100%)`,
          boxShadow: `0 0 60px ${colorSet.primary}, inset 0 0 60px ${colorSet.secondary}`,
          animation: 'pulse 4s ease-in-out infinite',
          animationDelay: `${animationDelay}s`,
        }}
      />
      <div
        className="absolute inset-0 rounded-full"
        style={{
          border: `1px solid ${colorSet.border}`,
          boxShadow: `inset 0 0 20px ${colorSet.secondary}`,
        }}
      />
    </div>
  );
});
GlowingOrbitPath.displayName = 'GlowingOrbitPath';

export default function OrbitingHealthFeatures() {
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      setTime(prevTime => prevTime + deltaTime);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  return (
    <div className="w-full flex items-center justify-center overflow-hidden py-16">
      <div 
        className="relative w-[500px] h-[500px] flex items-center justify-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        
        {/* Central Smart Ring with enhanced glow */}
        <div className="w-32 h-32 rounded-full flex items-center justify-center z-10 relative neon-glow floating-ring">
          <div className="absolute inset-0 rounded-full bg-hux-turquoise/30 blur-xl animate-pulse"></div>
          <div className="absolute inset-0 rounded-full bg-hux-gold/20 blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <img 
            src="/hux-ring.png" 
            alt="HUX Smart Ring" 
            className="relative z-10 w-28 h-28 rounded-full object-cover"
          />
        </div>

        {/* Render glowing orbit paths */}
        <GlowingOrbitPath radius={120} glowColor="turquoise" animationDelay={0} />
        <GlowingOrbitPath radius={200} glowColor="gold" animationDelay={1.5} />

        {/* Render orbiting health feature icons */}
        {healthFeaturesConfig.map((config) => {
          const angle = time * config.speed + (config.phaseShift || 0);
          return (
            <OrbitingFeature
              key={config.id}
              config={config}
              angle={angle}
            />
          );
        })}
      </div>
    </div>
  );
}