import React, { useState, useEffect, useRef } from 'react';

interface SectionData {
  text: string;
  subtitle: string;
  img: string;
}

interface AnimatedSectionsProps {
  sections?: SectionData[];
  className?: string;
}

const AnimatedSections: React.FC<AnimatedSectionsProps> = ({
  sections = [],
  className = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-play logic
  useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, [sections.length]);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sections.length);
    }, 5000);
  };

  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleManualSwitch = (index: number) => {
    stopTimer();
    setCurrentIndex(index);
    startTimer(); // Restart timer after manual interaction
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, path: string) => {
    const imgElement = e.currentTarget;
    // Construct fallback URL to the known GitHub repo structure
    const fallbackUrl = `https://raw.githubusercontent.com/mohan-slack/HUX_VIBE001/main/public${path}`;
    
    if (imgElement.src !== fallbackUrl) {
      console.warn(`[Hero] Local load failed for ${path}. Switching to fallback: ${fallbackUrl}`);
      imgElement.src = fallbackUrl;
    } else {
      console.error(`[Hero] Failed to load image from both local and fallback sources: ${path}`);
    }
  };

  return (
    <div className={`relative h-[80vh] w-full overflow-hidden bg-black text-white font-sans ${className}`}>
      
      {/* Slides */}
      {sections.map((section, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background Image Container */}
          <div className="absolute inset-0 w-full h-full bg-neutral-900">
            <img 
              src={section.img} 
              alt={section.subtitle}
              className="w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
              fetchpriority={index === 0 ? "high" : "low"}
              onError={(e) => handleImageError(e, section.img)}
            />
            
            {/* Dark Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
          </div>

          {/* Text Content */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className={`text-center px-4 max-w-5xl transition-all duration-1000 ease-out transform ${
              index === currentIndex ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <p className="text-hux-turquoise font-bold uppercase tracking-[0.3em] mb-4 text-sm md:text-base drop-shadow-md">
                {section.subtitle}
              </p>
              <h2 className="text-white font-display font-bold text-5xl md:text-8xl lg:text-9xl leading-tight drop-shadow-2xl">
                {section.text}
              </h2>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Controls / Thumbnails */}
      <div className="absolute bottom-8 right-6 z-30 flex items-center gap-4">
        <div className="flex gap-2">
          {sections.map((section, i) => (
            <button
              key={`thumb-${i}`}
              onClick={() => handleManualSwitch(i)}
              className={`w-12 h-8 rounded border overflow-hidden relative cursor-pointer transition-all duration-300 hover:scale-110 focus:outline-none ${
                currentIndex === i ? 'border-hux-turquoise scale-105' : 'border-white/20'
              }`}
            >
              <img
                src={section.img}
                alt={`Slide ${i + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => handleImageError(e, section.img)}
              />
              <div
                className={`absolute inset-0 bg-black transition-opacity duration-300 ${
                  currentIndex !== i ? 'opacity-50' : 'opacity-0'
                }`}
              />
            </button>
          ))}
        </div>

        {/* Counter */}
        <div className="text-sm tracking-wider flex items-center gap-1 font-display font-bold">
          <span className="text-white">{currentIndex + 1}</span>
          <span className="opacity-50 text-hux-turquoise">/ {sections.length}</span>
        </div>
      </div>

      {/* Scroll Hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 animate-bounce pointer-events-none z-20">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

    </div>
  );
};

export default AnimatedSections;