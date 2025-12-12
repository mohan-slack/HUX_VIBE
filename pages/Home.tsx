import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, ChevronLeft, Plus, Play, Moon, Activity, Zap, Star, ArrowRight, Heart, Brain, Box, Rotate3d, Move, Fingerprint, ShieldAlert, Wind, Bell, TrendingUp, Cpu, Battery, Wifi, Droplets, PackageOpen, Ruler, Palette, CheckCircle, ShoppingBag, Smartphone, Magnet, Cable, Sparkles, ScanFace } from 'lucide-react';
import { Button } from '../components/Button';
import { useShop } from '../context/ShopContext';
import { HUX_PRODUCT } from '../constants';
import { ProductColor, RingSize } from '../types';
import { MasonryGrid } from '../components/MasonryGrid';
import AnimatedSections from '../components/AnimatedSections';
import { useLocation, useNavigate } from 'react-router-dom';
import { ARTryOn } from '../components/ARTryOn';

const ExpandableSpecsItem = ({ title, items }: { title: string, items: string[] }) => {
  const [expanded, setExpanded] = useState(false);
  const previewCount = 3;

  return (
    <div className="group hover:-translate-x-2 transition-transform duration-300 flex flex-col items-center lg:items-end">
       <h4 className="font-bold text-hux-dark font-display text-lg mb-1 group-hover:text-hux-turquoise transition-colors">{title}</h4>
       <p className="text-neutral-500 font-light leading-relaxed max-w-xs text-center lg:text-right transition-all duration-300">
         {expanded ? items.join(', ') : items.slice(0, previewCount).join(', ') + '...'}
       </p>
       <button
         onClick={() => setExpanded(!expanded)}
         className="mt-2 text-[10px] font-bold text-hux-turquoise uppercase tracking-widest hover:text-hux-turquoiseDark transition-colors flex items-center gap-1 border-b border-transparent hover:border-hux-turquoise"
       >
         {expanded ? 'Show Less' : 'Show More'}
       </button>
    </div>
  );
};

export const Home = () => {
  const { addToCart } = useShop();
  const location = useLocation();
  const navigate = useNavigate();
  const [isAROpen, setIsAROpen] = useState(false);
  const [arColor, setArColor] = useState('Sterling Gold');

  // --- HASH SCROLL LOGIC ---
  useEffect(() => {
    // Check for both direct hash and state passed from navigation
    const targetId = location.hash ? location.hash.substring(1) : (location.state as any)?.scrollTo;

    if (targetId) {
      const elem = document.getElementById(targetId);
      if (elem) {
        setTimeout(() => {
          elem.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  const scrollToSection = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // --- STICKY BAR LOGIC ---
  const [showStickyBar, setShowStickyBar] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar after scrolling past 80% of viewport
      const threshold = window.innerHeight * 0.8;
      setShowStickyBar(window.scrollY > threshold);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- HERO SECTIONS DATA (GSAP) ---
  const heroSections = [
    {
      text: "INTELLIGENCE WORN.",
      subtitle: "The Future of Wellness",
      img: "/images/heroSection/hero-01.png"
    },
    {
      text: "SLEEP MASTERED.",
      subtitle: "Clinical Grade Analysis",
      img: "/images/heroSection/hero-02.png"
    },
    {
      text: "DESIGN DISAPPEARS.",
      subtitle: "Aerospace Titanium",
      img: "/images/heroSection/hero-03.png"
    }
  ];

  // --- RING CARD EXPANSION STATE ---
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  // --- ECOSYSTEM ACCORDION STATE ---
  const [activeTab, setActiveTab] = useState(0);
  const ecosystemItems = [
    { title: "Sleep", desc: "Understand your sleep cycles with clinical precision.", icon: Moon, image: "/images/features/sleep.jpg" },
    { title: "Activity", desc: "Track movement, steps, and caloric burn effortlessly.", icon: Activity, image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000&auto=format&fit=crop" },
    { title: "Recovery", desc: "Know exactly when to push and when to rest.", icon: Zap, image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1000&auto=format&fit=crop" }
  ];

  // --- GALLERY STATE ---
  const [activeGallery, setActiveGallery] = useState(0);
  const [dockImageIndex, setDockImageIndex] = useState(0);

  // Auto-rotate dock images
  useEffect(() => {
    const interval = setInterval(() => {
      setDockImageIndex(prev => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // --- 360 VIEW STATE ---
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const rotateRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    setStartX(clientX - rotation);
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    setRotation(clientX - startX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // --- MASONRY GRID COLUMNS ---
  const [columns, setColumns] = useState(3);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setColumns(1);
      else if (window.innerWidth < 1024) setColumns(2);
      else setColumns(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const featuresList = [
    { 
      title: "Gesture Control", 
      desc: "Navigate your digital world with subtle finger taps.", 
      icon: Fingerprint, 
      border: "border-cyan-400",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-working-on-a-holographic-screen-32724-large.mp4",
      imageUrl: "/images/features/smart.png"
    },
    { 
      title: "SOS Alert", 
      desc: "Triple-tap to instantly alert contacts with GPS location.", 
      icon: ShieldAlert, 
      border: "border-red-500",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-dialing-emergency-number-on-smartphone-4262-large.mp4",
      imageUrl: "/images/features/SOS.png"
    },
    { 
      title: "Heart & HRV", 
      desc: "Clinical-grade monitoring during every run and rest.", 
      icon: Heart, 
      border: "border-rose-400",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-silhouette-of-a-person-running-during-sunset-1711-large.mp4",
      imageUrl: "/images/features/HRV.png"
    },
    { 
      title: "Stress Detection", 
      desc: "Real-time autonomic nervous system analysis.", 
      icon: Activity, 
      border: "border-orange-400",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-girl-practicing-meditation-at-home-44670-large.mp4",
      imageUrl: "/images/features/Stress.png"
    },
    { 
      title: "AI Insights", 
      desc: "Predictive wellness that adapts to your daily lifestyle.", 
      icon: Brain, 
      border: "border-violet-500",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-motherboard-circuit-texture-loop-3221-large.mp4",
      imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop"
    },
    { 
      title: "Mindful Balance", 
      desc: "Dedicated Yoga modes to center your mind and body.", 
      icon: Wind, 
      border: "border-emerald-400",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-practicing-yoga-pose-on-the-beach-4061-large.mp4",
      imageUrl: "/images/features/Yoga.png"
    },
    { 
      title: "Vibration Alerts", 
      desc: "Discrete haptic notifications. Wake up silently.", 
      icon: Bell, 
      border: "border-amber-400",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-woman-sleeping-in-bed-4258-large.mp4",
      imageUrl: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=800&auto=format&fit=crop"
    },
    { 
      title: "Smart Touch Control", 
      desc: "Control music, take photos, and present slides remotely.", 
      icon: Smartphone, 
      border: "border-hux-turquoise",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-woman-typing-on-a-smartphone-4261-large.mp4",
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop"
    },
  ];

  const huxTestimonials = [
    {
      name: 'Arjun Reddy',
      role: 'Tech Lead, Bengaluru',
      feedback: "Survives the chaos of Bengaluru traffic and intense coding sprints. The sleep data helps me optimize my recovery after late-night deployments.",
      image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=80",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: 'Lakshmi Iyer',
      role: 'Carnatic Vocalist, Chennai',
      feedback: "During the Margazhi season, my stress levels peak. HUX helps me monitor my HRV and stay calm before concerts. It looks elegant with my Kanjeevarams.",
      image: "https://images.unsplash.com/photo-1621786040886-2a79247eb108?auto=format&fit=crop&w=800&q=80",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      name: 'Vihaan Rao',
      role: 'Entrepreneur, Hyderabad',
      feedback: "Perfect for the boardrooms of Hitech City. The Sterling Gold finish is a conversation starter during networking events.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
      avatar: "https://randomuser.me/api/portraits/men/54.jpg"
    },
    {
      name: 'Dr. Anjali Menon',
      role: 'Wellness Consultant, Kochi',
      feedback: "I advocate for a blend of modern data and traditional wellness. HUX tracks my vitals without emitting constant EMF radiation like watches.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
      avatar: "https://randomuser.me/api/portraits/women/33.jpg"
    },
    {
      name: 'Karthik Naidu',
      role: 'Marine Engineer, Vizag',
      feedback: "The waterproof rating is legit. I swim at Rushikonda beach every morning and track my laps. Titanium holds up against the salt air.",
      image: "https://images.unsplash.com/photo-1543781299-a467f339487c?auto=format&fit=crop&w=800&q=80",
      avatar: "https://randomuser.me/api/portraits/men/46.jpg"
    },
    {
      name: 'Zara Mistry',
      role: 'Fashion Stylist, Mumbai',
      feedback: "Finally, wearable tech that doesn't clash with couture. I wear the Lunar Rose ring to every gala and shoot.",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    {
      name: 'Rohan Malhotra',
      role: 'Marathoner, Delhi',
      feedback: "Tracks my winter runs near India Gate accurately. The SpO2 data helped me acclimatize for my Ladak trip.",
      image: "https://images.unsplash.com/photo-1552674605-469555f96752?auto=format&fit=crop&w=800&q=80",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg"
    },
    {
      name: 'Nithin Gowda',
      role: 'Coffee Planter, Coorg',
      feedback: "Rugged enough for the plantation, smart enough for my health. The battery life lasts through my week-long treks.",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
      avatar: "https://randomuser.me/api/portraits/men/11.jpg"
    },
    {
      name: 'Meera Reddy',
      role: 'Architect, Telangana',
      feedback: "Minimalist design fits my aesthetic. I sketch for hours, and unlike a watch, the ring never gets in the way of my wrist movement.",
      image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80",
      avatar: "https://randomuser.me/api/portraits/women/89.jpg"
    },
    {
      name: 'Siddharth Pillai',
      role: 'Chef, Kerala',
      feedback: "Kitchens are hot and frantic. HUX monitors my stress and stands up to constant hand washing. Essential gear.",
      image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80",
      avatar: "https://randomuser.me/api/portraits/men/78.jpg"
    }
  ];

  const sizingSteps = [
    { 
      step: "01", 
      title: "Measure", 
      desc: "Take a thread, wrap it around your forefinger, mark the ends, measure the distance, and determine your size using a ruler.", 
      icon: Ruler,
      img: "https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?q=80&w=800&auto=format&fit=crop" 
    },
    { 
      step: "02", 
      title: "Try a Sizing Kit", 
      desc: "Order a free HUX sizing kit to find your exact fit before you buy your smart ring.", 
      icon: PackageOpen,
      img: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop"
    },
    { 
      step: "03", 
      title: "Choose Color", 
      desc: "Select your favorite color from our exclusive smart ring collection.", 
      icon: Palette,
      img: "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?q=80&w=800&auto=format&fit=crop"
    },
    { 
      step: "04", 
      title: "Place Your Order", 
      desc: "Confirm your exact size and color, then place your order to get your HUX Smart Ring delivered.", 
      icon: ShoppingBag,
      img: "/images/dock/coupleRings001.png"
    }
  ];

  return (
    <div className="min-h-screen bg-hux-ivory overflow-x-hidden selection:bg-hux-turquoise selection:text-white"
         onMouseUp={handleMouseUp}
         onTouchEnd={handleMouseUp}>
      
      <ARTryOn isOpen={isAROpen} onClose={() => setIsAROpen(false)} productColor={arColor} />

      {/* 1. HERO SECTION - ANIMATED SECTIONS (GSAP) */}
      <AnimatedSections sections={heroSections} />

      {/* 2. 360 STUDIO SECTION */}
      <section className="py-24 bg-white overflow-hidden relative mobile-corner-cut">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="order-2 lg:order-1 space-y-8">
            <h2 className="text-5xl font-display font-bold text-hux-dark leading-tight">
              360° of <br/>
              <span className="text-hux-turquoise">Perfection</span>
            </h2>
            <p className="text-xl text-neutral-500 font-light leading-relaxed">
              Experience the HUX Smart Ring from every angle. Crafted from aerospace-grade titanium, it features a seamless, button-free design that feels as good as it looks.
            </p>
            <div className="flex gap-4">
               <div className="flex items-center gap-4 text-sm font-bold text-neutral-400 uppercase tracking-widest">
                 <Rotate3d className="text-hux-turquoise animate-spin-slow" />
                 <span>Interactive 3D View</span>
               </div>
               <button 
                 onClick={() => { setArColor('Sterling Gold'); setIsAROpen(true); }}
                 className="flex items-center gap-2 text-sm font-bold text-hux-turquoise uppercase tracking-widest hover:text-hux-turquoiseDark transition-colors"
               >
                 <ScanFace size={18} />
                 <span>Virtual Try-On</span>
               </button>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative h-[500px] flex items-center justify-center bg-neutral-50 rounded-[3rem] shadow-inner cursor-grab active:cursor-grabbing"
               onMouseDown={handleMouseDown}
               onMouseMove={handleMouseMove}
               onTouchStart={handleMouseDown}
               onTouchMove={handleMouseMove}
               ref={rotateRef}
          >
             {/* 3D Ring Object - Simulated with CSS */}
             <div className="relative w-64 h-64 perspective-1000" style={{ perspective: '1000px' }}>
                <div className="w-full h-full relative transform-style-3d transition-transform duration-75 ease-out"
                     style={{ transform: `rotateX(-15deg) rotateY(${rotation}deg)` }}>
                   
                   {/* Ring Outer Face */}
                   <div className="absolute inset-0 rounded-full border-[30px] border-neutral-300 shadow-[0_0_50px_rgba(0,0,0,0.1)]"
                        style={{ 
                          borderColor: '#d1d5db', 
                          background: 'transparent',
                          transform: 'translateZ(0px)'
                        }}>
                   </div>
                   
                   {/* Ring Inner Face (Simulation) */}
                   <div className="absolute inset-0 rounded-full border-[30px] border-neutral-400 scale-[0.98]"
                        style={{ 
                          borderColor: '#9ca3af',
                          transform: 'translateZ(-5px)' 
                        }}>
                   </div>

                   {/* Highlights for metallic effect */}
                   <div className="absolute inset-0 rounded-full border-[30px] border-transparent border-t-white/80 border-b-black/10 blur-sm"></div>
                   
                   {/* Sensor bumps on inner ring */}
                   <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-8 h-4 bg-black/80 rounded-full blur-[1px] transform translate-z-[-10px]"></div>
                </div>
             </div>

             {/* Instruction Overlay */}
             <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-opacity duration-300 ${isDragging ? 'opacity-0' : 'opacity-100'}`}>
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-2 rounded-full shadow-sm text-xs font-bold text-neutral-500 uppercase tracking-wider pointer-events-none">
                  <Move size={14} /> Drag to Rotate
                </div>
             </div>
          </div>

        </div>
      </section>

      {/* 3. FULL-SCREEN EXPANDABLE CAPABILITIES CARDS */}
      <section className="py-16 md:py-24 bg-neutral-100 relative overflow-hidden mobile-corner-cut">
        <div className="text-center mb-12 md:mb-16 px-6">
          <h2 className="text-sm font-bold text-hux-turquoise uppercase tracking-widest mb-4">Capabilities</h2>
          <h3 className="text-4xl md:text-6xl font-display font-bold text-hux-dark mb-4">The Ring of Life.</h3>
          <p className="text-xl text-neutral-500 max-w-2xl mx-auto">Click to explore the technology woven into your lifestyle.</p>
        </div>

        {/* Desktop: Horizontal scroll layout */}
        <div className="hidden md:block px-6">
          <div className="flex gap-4 h-[70vh] overflow-x-auto scrollbar-hide pb-4" style={{ scrollSnapType: 'x mandatory' }}>
          {[
            {
              id: 'sleep',
              category: 'Sleep and Rest',
              title: "Get the best sleep",
              subtitle: "of your life",
              description: "Advanced sleep tracking with detailed analysis of your sleep stages, quality, and recovery patterns.",
              image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=1000&auto=format&fit=crop",
              icon: Moon
            },
            {
              id: 'wellness',
              category: 'Wellness and Longevity',
              title: "Don't just live longer,",
              subtitle: "live healthier",
              description: "Little changes add up. Focus on the health metrics that impact how you feel each day, so you feel better long term.",
              image: "/images/features/Yoga.png",
              icon: Heart
            },
            {
              id: 'fitness',
              category: 'Activity and Fitness',
              title: "Bring your fitness goals",
              subtitle: "into focus",
              description: "Track your workouts, monitor your progress, and achieve your fitness goals with precision data and insights.",
              image: "/images/features/Intense.png",
              icon: Activity
            },
            {
              id: 'heart',
              category: 'Heart Health',
              title: "Listen to what your heart is",
              subtitle: "telling you",
              description: "Advanced heart rate monitoring and HRV analysis to understand your cardiovascular health and recovery.",
              image: "/images/features/HRV.png",
              icon: Heart
            },
            {
              id: 'sos',
              category: 'SOS Alert',
              title: "Emergency help when",
              subtitle: "you need it most",
              description: "Triple-tap to instantly alert your emergency contacts with GPS location and vital information.",
              image: "/images/features/SOS.png",
              icon: ShieldAlert
            },
            {
              id: 'vibration',
              category: 'Vibration Alerts',
              title: "Stay connected without",
              subtitle: "the distraction",
              description: "Discrete haptic notifications for calls, messages, and reminders. Wake up silently without disturbing others.",
              image: "/images/features/Gesture.png",
              icon: Bell
            }
          ].map((card, idx) => {
            const isExpanded = expandedCard === card.id;
            return (
              <div
                key={card.id}
                className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 ease-out flex-shrink-0 ${
                  isExpanded ? 'w-[60vw]' : 'w-[22vw]'
                }`}
                onClick={() => setExpandedCard(isExpanded ? null : card.id)}
                style={{ scrollSnapAlign: 'start' }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                  style={{ backgroundImage: `url(${card.image})` }}
                />
                <div className="absolute inset-0 bg-black/40" />
                
                <div className="absolute top-6 left-6 z-20">
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/30">
                    <card.icon size={16} className="text-white" />
                    <span className="text-white text-sm font-medium">{card.category}</span>
                  </div>
                </div>

                <button className="absolute top-6 right-6 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-colors z-20">
                  <Plus size={20} className={`transition-transform duration-300 ${isExpanded ? 'rotate-45' : ''}`} />
                </button>

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className={`transition-all duration-500 ${isExpanded ? 'mb-8' : 'mb-0'}`}>
                    <h3 className="text-2xl md:text-4xl font-bold mb-1">
                      {card.title}
                    </h3>
                    <h4 className="text-2xl md:text-4xl font-bold italic text-hux-turquoise mb-4">
                      {card.subtitle}
                    </h4>
                    
                    <div className={`overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <p className="text-neutral-200 leading-relaxed mb-6 text-lg">
                        {card.description}
                      </p>
                      <button className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-neutral-100 transition-colors">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>

                {!isExpanded && (
                  <div className="absolute bottom-6 left-6 w-16 h-1 bg-white/30 rounded-full overflow-hidden">
                    <div className="h-full bg-white rounded-full" style={{ width: `${((idx + 1) / 6) * 100}%` }} />
                  </div>
                )}
              </div>
            );
          })}
          </div>
        </div>

        {/* Mobile: Horizontal scroll with partial next card visible */}
        <div className="md:hidden">
          <div className="flex gap-4 overflow-x-auto scrollbar-hide px-6 pb-4" style={{ scrollSnapType: 'x mandatory' }}>
            {[
              {
                id: 'sleep',
                category: 'Sleep and Rest',
                title: "Get the best sleep",
                subtitle: "of your life",
                description: "Advanced sleep tracking with detailed analysis of your sleep stages, quality, and recovery patterns.",
                image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=1000&auto=format&fit=crop",
                icon: Moon
              },
              {
                id: 'wellness',
                category: 'Wellness and Longevity',
                title: "Don't just live longer,",
                subtitle: "live healthier",
                description: "Little changes add up. Focus on the health metrics that impact how you feel each day.",
                image: "/images/features/Yoga.png",
                icon: Heart
              },
              {
                id: 'fitness',
                category: 'Activity and Fitness',
                title: "Bring your fitness goals",
                subtitle: "into focus",
                description: "Track your workouts, monitor your progress, and achieve your fitness goals with precision data.",
                image: "/images/features/Intense.png",
                icon: Activity
              },
              {
                id: 'heart',
                category: 'Heart Health',
                title: "Listen to what your heart is",
                subtitle: "telling you",
                description: "Advanced heart rate monitoring and HRV analysis to understand your cardiovascular health.",
                image: "/images/features/HRV.png",
                icon: Heart
              },
              {
                id: 'sos',
                category: 'SOS Alert',
                title: "Emergency help when",
                subtitle: "you need it most",
                description: "Triple-tap to instantly alert your emergency contacts with GPS location.",
                image: "/images/features/SOS.png",
                icon: ShieldAlert
              },
              {
                id: 'vibration',
                category: 'Vibration Alerts',
                title: "Stay connected without",
                subtitle: "the distraction",
                description: "Discrete haptic notifications and silent wake-up alerts.",
                image: "/images/features/Gesture.png",
                icon: Bell
              }
            ].map((card, idx) => (
              <div
                key={card.id}
                className="relative rounded-3xl overflow-hidden flex-shrink-0 w-[85vw] h-[60vh]"
                style={{ scrollSnapAlign: 'start' }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${card.image})` }}
                />
                <div className="absolute inset-0 bg-black/40" />
                
                <div className="absolute top-4 left-4 z-20">
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/30">
                    <card.icon size={14} className="text-white" />
                    <span className="text-white text-xs font-medium">{card.category}</span>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-xl font-bold mb-1">
                    {card.title}
                  </h3>
                  <h4 className="text-xl font-bold italic text-hux-turquoise mb-3">
                    {card.subtitle}
                  </h4>
                  <p className="text-neutral-200 text-sm leading-relaxed mb-4">
                    {card.description}
                  </p>
                  <button className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows - Desktop only */}
        <div className="hidden md:flex justify-center gap-4 mt-8">
          <button className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white hover:bg-neutral-800 transition-colors">
            <ChevronLeft size={20} />
          </button>
          <button className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white hover:bg-neutral-800 transition-colors">
            <ChevronRight size={20} />
          </button>
        </div>
      </section>

      {/* 4. RING COLLECTION GRID - TRANSPARENT GLASS CARDS */}
      <section id="collection" className="py-24 max-w-7xl mx-auto px-6 mobile-corner-cut-subtle">
         <div className="text-center mb-20 space-y-4">
            <h2 className="text-sm font-bold text-hux-turquoise uppercase tracking-widest">The Collection</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-hux-dark">Design That Disappears</h3>
         </div>

         <div className="space-y-32">
            {/* Tarnish Grey - Text Left, Images Right */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
               {/* Text Content */}
               <div className="space-y-6 lg:pr-12">
                  <div className="inline-block px-4 py-1.5 bg-neutral-100 rounded-full">
                     <span className="text-xs font-bold text-neutral-600 uppercase tracking-wider">Titanium Alloy</span>
                  </div>
                  <h4 className="text-4xl md:text-5xl font-display font-bold text-hux-dark">Tarnish Grey</h4>
                  <p className="text-lg text-neutral-600 leading-relaxed">
                     Engineered for those who value subtlety. The Tarnish Grey finish blends seamlessly with your style, 
                     offering premium durability with a matte, industrial aesthetic.
                  </p>
                  <div className="flex items-baseline gap-3 pt-4">
                     <span className="text-3xl font-bold text-hux-turquoise">₹12,999</span>
                     <span className="text-lg text-neutral-400 line-through">₹22,999</span>
                  </div>
                  <div className="flex gap-4 pt-6">
                     <Button onClick={() => { addToCart('Tarnish Grey', 8); navigate('/bag'); }} className="bg-hux-turquoise text-white hover:bg-hux-turquoiseLight px-8 py-3 rounded-xl font-bold">
                        Quick Add
                     </Button>
                     <Button 
                        variant="outline" 
                        onClick={() => { setArColor('Tarnish Grey'); setIsAROpen(true); }}
                        className="flex items-center gap-2"
                     >
                        <ScanFace size={18} /> Virtual Try-On
                     </Button>
                  </div>
               </div>

               {/* Image Grid */}
               <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                     <img 
                        src="/images/productImages/tarnishImages/tarnish01.png" 
                        alt="Tarnish Grey Main"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                     />
                  </div>
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
                     <img 
                        src="/images/productImages/tarnishImages/tarnish02.png" 
                        alt="Tarnish Grey Detail 1"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                     />
                  </div>
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
                     <img 
                        src="/images/productImages/tarnishImages/tarnish03.png" 
                        alt="Tarnish Grey Detail 2"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                     />
                  </div>
               </div>
            </div>

            {/* Sterling Gold - Images Left, Text Right */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
               {/* Image Grid */}
               <div className="grid grid-cols-2 gap-4 order-2 lg:order-1">
                  <div className="col-span-2 aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                     <img 
                        src="/images/productImages/goldImages/gold01.png" 
                        alt="Sterling Gold Main"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                     />
                  </div>
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
                     <img 
                        src="/images/productImages/goldImages/gold02.png" 
                        alt="Sterling Gold Detail 1"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                     />
                  </div>
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
                     <img 
                        src="/images/productImages/goldImages/gold03.png" 
                        alt="Sterling Gold Detail 2"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                     />
                  </div>
               </div>

               {/* Text Content */}
               <div className="space-y-6 lg:pl-12 order-1 lg:order-2">
                  <div className="inline-block px-4 py-1.5 bg-yellow-50 rounded-full">
                     <span className="text-xs font-bold text-yellow-700 uppercase tracking-wider">Premium Finish</span>
                  </div>
                  <h4 className="text-4xl md:text-5xl font-display font-bold text-hux-dark">Sterling Gold</h4>
                  <p className="text-lg text-neutral-600 leading-relaxed">
                     A statement of refined elegance. The Sterling Gold variant combines luxury with cutting-edge technology, 
                     perfect for those who appreciate timeless sophistication.
                  </p>
                  <div className="flex items-baseline gap-3 pt-4">
                     <span className="text-3xl font-bold text-hux-turquoise">₹12,999</span>
                     <span className="text-lg text-neutral-400 line-through">₹22,999</span>
                  </div>
                  <div className="flex gap-4 pt-6">
                     <Button onClick={() => { addToCart('Sterling Gold', 8); navigate('/bag'); }} className="bg-hux-turquoise text-white hover:bg-hux-turquoiseLight px-8 py-3 rounded-xl font-bold">
                        Quick Add
                     </Button>
                     <Button 
                        variant="outline" 
                        onClick={() => { setArColor('Sterling Gold'); setIsAROpen(true); }}
                        className="flex items-center gap-2"
                     >
                        <ScanFace size={18} /> Virtual Try-On
                     </Button>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 4.5 NEW: CHARGING DOCK SECTION */}
      <section className="py-24 bg-neutral-900 text-white relative overflow-hidden mobile-corner-cut">
        {/* Background glow effects */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-hux-turquoise/20 rounded-full blur-[120px]"></div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          
          {/* Visual - Sliding Dock Images */}
          <div className="relative group overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-hux-turquoise/20 blur-3xl opacity-30 group-hover:opacity-50 transition-opacity z-0"></div>
            
            {/* Image Carousel */}
            <div className="relative">
              <div 
                className="flex transition-transform duration-1000 ease-in-out"
                style={{ transform: `translateX(-${dockImageIndex * 100}%)` }}
              >
                {[
                  '/images/dock/dock001.png',
                  '/images/dock/dock002.png', 
                  '/images/dock/dock003.png',
                  '/images/dock/dock004.png'
                ].map((src, idx) => (
                  <img 
                    key={idx}
                    src={src}
                    alt={`HUX Charging Dock ${idx + 1}`}
                    className="w-full flex-shrink-0 rounded-3xl shadow-2xl border border-white/10 brightness-75 contrast-125"
                  />
                ))}
              </div>
            </div>
            
            {/* Overlay indicators */}
            <div className="absolute bottom-10 left-10 z-20 flex gap-2">
              {[0, 1, 2, 3].map((idx) => (
                <div 
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-all duration-500 ${
                    dockImageIndex === idx
                      ? 'bg-green-400 shadow-[0_0_10px_#4ade80] animate-pulse'
                      : 'bg-neutral-600'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
             <div className="space-y-4">
               <h2 className="text-sm font-bold text-hux-turquoise uppercase tracking-widest">Power - Charging Dock</h2>
               <h3 className="text-4xl md:text-5xl font-display font-bold">Infinite Power. <br/>Zero Friction.</h3>
               <p className="text-neutral-400 text-lg leading-relaxed">
                 A charging experience as seamless as the ring itself. The magnetic dock aligns perfectly every time, providing a full week of power in just 45 minutes.
               </p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Feature 1 */}
                <div className="flex gap-4">
                   <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-hux-turquoise">
                      <Magnet size={24} />
                   </div>
                   <div>
                      <h4 className="font-bold text-white mb-1">Magnetic Alignment</h4>
                      <p className="text-sm text-neutral-400">Precision magnets snap into place.</p>
                   </div>
                </div>
                {/* Feature 2 */}
                <div className="flex gap-4">
                   <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-hux-turquoise">
                      <Cable size={24} />
                   </div>
                   <div>
                      <h4 className="font-bold text-white mb-1">USB-C Fast Charge</h4>
                      <p className="text-sm text-neutral-400">Universal standard. Rapid delivery.</p>
                   </div>
                </div>
                 {/* Feature 3 */}
                <div className="flex gap-4">
                   <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-hux-turquoise">
                      <Box size={24} />
                   </div>
                   <div>
                      <h4 className="font-bold text-white mb-1">Compact Design</h4>
                      <p className="text-sm text-neutral-400">Fits in your coin pocket.</p>
                   </div>
                </div>
                 {/* Feature 4 */}
                <div className="flex gap-4">
                   <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-hux-turquoise">
                      <Sparkles size={24} />
                   </div>
                   <div>
                      <h4 className="font-bold text-white mb-1">Matte Finish</h4>
                      <p className="text-sm text-neutral-400">Premium touch. Fingerprint resistant.</p>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </section>

      {/* 5. SMART ECOSYSTEM ACCORDION */}
      <section id="ecosystem" className="py-24 bg-white mobile-corner-cut">
         <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
               
               {/* Left: Text Accordion */}
               <div className="w-full lg:w-1/2 space-y-2">
                  <h2 className="text-5xl font-display font-bold text-hux-dark mb-12">Total Body<br/>Intelligence</h2>
                  {ecosystemItems.map((item, idx) => (
                    <div 
                      key={idx}
                      onClick={() => setActiveTab(idx)}
                      className={`cursor-pointer border-l-4 pl-6 py-6 transition-all duration-300 ${activeTab === idx ? 'border-hux-turquoise bg-neutral-50' : 'border-neutral-200 hover:border-neutral-300'}`}
                    >
                       <h3 className={`text-2xl font-bold mb-2 flex items-center gap-3 ${activeTab === idx ? 'text-hux-dark' : 'text-neutral-400'}`}>
                         <item.icon size={24} className={activeTab === idx ? 'text-hux-turquoise' : 'text-neutral-300'} />
                         {item.title}
                       </h3>
                       <div className={`overflow-hidden transition-all duration-300 ${activeTab === idx ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
                          <p className="text-neutral-500 leading-relaxed">{item.desc}</p>
                       </div>
                    </div>
                  ))}
               </div>

               {/* Right: Image Swap */}
               <div className="w-full lg:w-1/2 h-[400px] lg:h-[600px] relative rounded-[3rem] overflow-hidden shadow-2xl">
                  {ecosystemItems.map((item, idx) => (
                     <div 
                       key={idx}
                       className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ${activeTab === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
                       style={{ backgroundImage: `url(${item.image})` }}
                     >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-10 left-10 text-white">
                           <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl inline-block border border-white/30">
                              <item.icon className="mb-2" />
                              <span className="font-bold">{item.title} Analytics</span>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>

            </div>
         </div>
      </section>

      {/* 6. VIDEO INTEGRATION */}
      <section className="relative h-[80vh] w-full overflow-hidden flex items-center justify-center">
         <video 
           autoPlay muted loop playsInline 
           className="absolute inset-0 w-full h-full object-cover"
         >
           <source src="/images/5ATM Water Proof.mp4" type="video/mp4" />
         </video>
         <div className="absolute inset-0 bg-hux-turquoise/80 mix-blend-multiply"></div>
         <div className="absolute inset-0 bg-black/30"></div>
         
         <div className="relative z-10 text-center text-white px-6 max-w-4xl">
            <h2 className="text-6xl md:text-8xl font-display font-bold mb-8">Unstoppable</h2>
            <p className="text-2xl font-light mb-12 text-white/90">Built for the sweat, the rain, and the depths. 5ATM Waterproof.</p>
            <Button variant="glass" className="mx-auto text-white border-white" onClick={() => scrollToSection('specs')}>Explore Durability</Button>
         </div>
      </section>

      {/* 7. EXPANDING GALLERY */}
      <section className="py-24 bg-white mobile-corner-cut-subtle">
          <div className="max-w-7xl mx-auto px-6 h-[500px] flex flex-col md:flex-row gap-4">
              {[
                { 
                  title: "Design", 
                  desc: "Minimal. Futuristic. HUX",
                  img: "https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?auto=format&fit=crop&q=80&w=1000"
                },
                { 
                  title: "Precision Sensors", 
                  desc: "Nano-grade accuracy in every measurement",
                  img: "/images/Grid-Spec/sensors.gif"
                },
                { 
                  title: "Wellness AI", 
                  desc: "New insights. More clarity",
                  img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1000"
                },
                { 
                  title: "Privacy", 
                  desc: "Your data. Always yours.",
                  img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1000"
                }
              ].map((item, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setActiveGallery(idx)}
                    className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 ease-in-out ${activeGallery === idx ? 'flex-[4]' : 'flex-[1]'} bg-neutral-100 group`}
                  >
                     <div 
                       className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                       style={{ backgroundImage: `url(${item.img})` }}
                     />
                     <div className={`absolute inset-0 bg-black/40 transition-opacity ${activeGallery === idx ? 'opacity-20' : 'opacity-60 hover:opacity-40'}`}></div>
                     
                     <div className="absolute bottom-8 left-8 text-white max-w-xs">
                        <h3 className={`font-bold text-2xl mb-2 ${activeGallery === idx ? 'opacity-100 translate-y-0' : 'opacity-100 md:opacity-0 md:translate-y-4'} transition-all duration-500`}>
                          {item.title}
                        </h3>
                        <p className={`text-base font-light text-neutral-100 leading-relaxed ${activeGallery === idx ? 'opacity-100 translate-y-0 delay-100' : 'opacity-0 translate-y-4'} transition-all duration-500`}>
                          {item.desc}
                        </p>
                     </div>
                     
                     {/* Mobile Label */}
                     <div className={`absolute bottom-8 left-8 md:hidden ${activeGallery !== idx ? 'block' : 'hidden'}`}>
                        <h3 className="font-bold text-xl text-white">{item.title}</h3>
                     </div>
                     
                     {/* Vertical Text for Inactive Desktop Cards */}
                     {activeGallery !== idx && (
                       <div className="hidden md:block absolute bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap -rotate-90 origin-center opacity-70 font-bold text-white tracking-widest uppercase text-xs">
                          {item.title}
                       </div>
                     )}
                  </div>
              ))}
          </div>
      </section>

      {/* 8. NEW: PRODUCT SPECIFICATIONS */}
      <section id="specs" className="py-24 bg-neutral-50 relative overflow-hidden border-t border-neutral-100 mobile-corner-cut">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 space-y-4">
               <h2 className="text-sm font-bold text-hux-turquoise uppercase tracking-widest">HUX Product Specifications</h2>
               <h3 className="text-4xl md:text-5xl font-display font-bold text-hux-dark">Engineered Precision.</h3>
               <p className="text-xl text-neutral-500">Designed for Everyday Brilliance.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
               {/* LEFT COLUMN */}
               <div className="space-y-10 text-center lg:text-right">
                  <div className="group hover:-translate-x-2 transition-transform duration-300">
                    <h4 className="font-bold text-hux-dark font-display text-lg mb-1 group-hover:text-hux-turquoise transition-colors">Name</h4>
                    <p className="text-neutral-500 font-light">HUX-NEXus Smart Ring</p>
                  </div>
                   <ExpandableSpecsItem 
                     title="Features" 
                     items={["Heart Rate", "SpO₂", "Temperature", "Sleep", "Stress", "Activity", "Recovery", "VO₂ Max", "Strain"]} 
                   />
                   <div className="group hover:-translate-x-2 transition-transform duration-300">
                    <h4 className="font-bold text-hux-dark font-display text-lg mb-1 group-hover:text-hux-turquoise transition-colors">Material</h4>
                    <p className="text-neutral-500 font-light">Titanium Alloy with Liquid Glass Coating</p>
                  </div>
                   <div className="group hover:-translate-x-2 transition-transform duration-300">
                    <h4 className="font-bold text-hux-dark font-display text-lg mb-1 group-hover:text-hux-turquoise transition-colors">Sizes</h4>
                    <p className="text-neutral-500 font-light">6, 7, 8, 9, 10, 11, 12, 13</p>
                  </div>
                  <div className="group hover:-translate-x-2 transition-transform duration-300">
                    <h4 className="font-bold text-hux-dark font-display text-lg mb-1 group-hover:text-hux-turquoise transition-colors">Colors</h4>
                    <p className="text-neutral-500 font-light">Tarnish Grey, Sterling Gold</p>
                  </div>
               </div>

               {/* CENTER - ANIMATION */}
               <div className="relative h-[450px] flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-b from-hux-turquoise/5 to-transparent rounded-full blur-3xl"></div>
                  
                  {/* Ring Animation GIF */}
                  <div className="relative flex items-center justify-center">
                      <img 
                        src="/images/ring-animation.gif" 
                        alt="HUX Smart Ring Animation"
                        className="w-80 h-80 object-contain"
                      />
                  </div>
               </div>

               {/* RIGHT COLUMN */}
               <div className="space-y-10 text-center lg:text-left">
                  <div className="group hover:translate-x-2 transition-transform duration-300">
                    <h4 className="font-bold text-hux-dark font-display text-lg mb-1 group-hover:text-hux-turquoise transition-colors flex items-center justify-center lg:justify-start gap-2">Battery <Battery size={16} className="text-neutral-400"/></h4>
                    <p className="text-neutral-500 font-light">Rechargeable 25 mAh LiPo — Up to 7 Days</p>
                  </div>
                   <div className="group hover:translate-x-2 transition-transform duration-300">
                    <h4 className="font-bold text-hux-dark font-display text-lg mb-1 group-hover:text-hux-turquoise transition-colors flex items-center justify-center lg:justify-start gap-2">Connectivity <Wifi size={16} className="text-neutral-400"/></h4>
                    <p className="text-neutral-500 font-light">Bluetooth 5.2, Low Energy</p>
                  </div>
                   <div className="group hover:translate-x-2 transition-transform duration-300">
                    <h4 className="font-bold text-hux-dark font-display text-lg mb-1 group-hover:text-hux-turquoise transition-colors flex items-center justify-center lg:justify-start gap-2">Certifications <ShieldAlert size={16} className="text-neutral-400"/></h4>
                    <p className="text-neutral-500 font-light">5ATM, CE, RoHS, FCC, REACH, BIS</p>
                  </div>
                   <div className="group hover:translate-x-2 transition-transform duration-300">
                    <h4 className="font-bold text-hux-dark font-display text-lg mb-1 group-hover:text-hux-turquoise transition-colors flex items-center justify-center lg:justify-start gap-2">In the Box <Box size={16} className="text-neutral-400"/></h4>
                    <p className="text-neutral-500 font-light">Ring, USB Cable, Charging Case, Manual</p>
                  </div>
                   <div className="group hover:translate-x-2 transition-transform duration-300">
                    <h4 className="font-bold text-hux-dark font-display text-lg mb-1 group-hover:text-hux-turquoise transition-colors flex items-center justify-center lg:justify-start gap-2">Water Resistance <Droplets size={16} className="text-neutral-400"/></h4>
                    <p className="text-neutral-500 font-light">Yes — Up to 50m</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 9. UNBOXING EXPERIENCE */}
      <section className="py-24 bg-white relative overflow-hidden mobile-corner-cut-subtle">
        <div className="max-w-7xl mx-auto px-6">
           <div className="text-center mb-16 space-y-4">
              <h2 className="text-sm font-bold text-hux-turquoise uppercase tracking-widest">Unboxing</h2>
              <h3 className="text-4xl md:text-5xl font-display font-bold text-hux-dark">The Complete Package</h3>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { 
                  name: "HUX Smart Ring", 
                  desc: "Your ultimate health companion that tracks you 24/7 — seamlessly, stylishly, and smartly.",
                  img: "/images/dock/coupleRings001.png"
                },
                { 
                  name: "Charging Case", 
                  desc: "Compact and durable magnetic cradle for fast and safe charging.",
                  img: "/images/dock/dock004.png"
                },
                { 
                  name: "User Manual", 
                  desc: "Step-by-step guide to help you set up and experience HUX with ease.",
                  img: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600"
                }
              ].map((item, idx) => (
                <div key={idx} className="group flex flex-col items-center text-center">
                   <div className="relative w-full h-64 rounded-[2rem] overflow-hidden mb-8 border border-neutral-100 shadow-sm group-hover:shadow-xl transition-all duration-500">
                      <img src={idx === 1 ? "/images/dock/dock004.png" : item.img} alt={item.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                   </div>
                   <h4 className="text-xl font-bold font-display text-hux-dark mb-2 group-hover:text-hux-turquoise transition-colors">{item.name}</h4>
                   <p className="text-sm text-neutral-500 leading-relaxed max-w-xs">{item.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* 10. NEW: PRECISION SIZING GUIDE */}
      <section className="py-32 bg-white relative overflow-hidden mobile-corner-cut">
         {/* Background decorative elements */}
         <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>

         <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-24 space-y-4">
               <h2 className="text-sm font-bold text-hux-turquoise uppercase tracking-widest">Fit Guide</h2>
               <h3 className="text-5xl md:text-6xl font-display font-bold text-hux-dark">Find Your Perfect Fit</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               {sizingSteps.map((item, idx) => (
                  <div key={idx} className="group relative bg-white rounded-[2.5rem] p-0 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-neutral-100 overflow-hidden flex flex-col h-full">
                     
                     {/* Image Header Area */}
                     <div className="relative h-48 overflow-hidden">
                       <img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                       <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                       
                       {/* Floating 'Sign' Badge */}
                       <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-white rounded-2xl shadow-xl flex items-center justify-center border-4 border-white z-20 group-hover:scale-110 transition-transform duration-500">
                          <item.icon size={32} className="text-hux-turquoise" strokeWidth={2} />
                       </div>
                     </div>

                     <div className="pt-16 pb-10 px-8 text-center flex-1 flex flex-col items-center relative">
                       {/* Step Number Watermark */}
                       <div className="absolute top-2 right-4 text-6xl font-display font-bold text-neutral-100 select-none -z-0">
                          {item.step}
                       </div>

                       <h4 className="text-2xl font-display font-bold text-hux-dark mb-4 relative z-10">{item.title}</h4>
                       <p className="text-sm text-neutral-500 leading-relaxed relative z-10">{item.desc}</p>
                     </div>
                     
                     {/* Bottom accent line */}
                     <div className="h-1.5 w-full bg-neutral-100 mt-auto">
                        <div className="h-full bg-hux-turquoise w-0 group-hover:w-full transition-all duration-700 ease-in-out"></div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* 11. REVIEWS MASONRY GRID */}
      <section className="py-24 bg-white overflow-hidden mobile-corner-cut-subtle">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
               <h2 className="text-sm font-bold text-hux-turquoise uppercase tracking-widest">Community</h2>
               <h3 className="text-4xl font-display font-bold text-hux-dark mt-2">What People Are Saying</h3>
            </div>
            
            <MasonryGrid columns={columns} gap={6}>
              {huxTestimonials.map((review, idx) => (
                <div key={idx} className="relative rounded-3xl overflow-hidden group transition-all duration-300 hover:shadow-2xl border border-neutral-100">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 text-white w-full">
                    <p className="text-lg font-medium leading-snug mb-4 italic text-neutral-100">"{review.feedback}"</p>
                    <div className="flex items-center gap-3">
                      <img
                        src={review.avatar}
                        className="w-10 h-10 rounded-full border-2 border-white/80"
                        alt={review.name}
                      />
                      <div>
                        <span className="block font-bold text-sm">{review.name}</span>
                        <span className="block text-xs text-hux-turquoise font-medium uppercase tracking-wide">{review.role}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </MasonryGrid>
         </div>
      </section>

      {/* CTA FOOTER */}
      <section className="py-32 bg-hux-dark text-center relative overflow-hidden mobile-corner-cut">
         <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: 'url(/images/banners/evolve.png)'}}></div>
         <div className="absolute inset-0 bg-black/60"></div>
         
         <div className="relative z-10 max-w-2xl mx-auto px-6">
             <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-8">Ready to evolve?</h2>
             <p className="text-xl text-neutral-400 mb-12">Join the HUX ecosystem today and experience the future of personal health.</p>
             <Button variant="primary" className="mx-auto px-12 py-4 text-lg" onClick={() => scrollToSection('collection')}>Order Your HUX Ring</Button>
         </div>
      </section>

      {/* COMPREHENSIVE FOOTER */}
      <footer className="bg-hux-dark text-white py-16 relative overflow-hidden mobile-corner-cut">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-hux-turquoise/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-hux-turquoise/5 rounded-full blur-2xl"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
            
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-4">
                <img src="/images/logo.png" alt="HUX" className="h-12 w-auto" />
                <p className="text-lg font-light text-neutral-300">Intelligence Worn.</p>
                <p className="text-sm text-neutral-400 leading-relaxed max-w-md">
                  The convergence of luxury and biometric technology. Experience the future of wellness with precision health monitoring that disappears into your lifestyle.
                </p>
              </div>
            </div>

            {/* Our Company */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-white mb-6">Our Company</h4>
              <ul className="space-y-3">
                <li><a href="/about" className="text-neutral-400 hover:text-hux-turquoise transition-colors text-sm">About Us</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-hux-turquoise transition-colors text-sm">Leadership</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-hux-turquoise transition-colors text-sm">Medical Advisory Board</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-hux-turquoise transition-colors text-sm">Careers</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-hux-turquoise transition-colors text-sm">Newsroom</a></li>
              </ul>
            </div>

            {/* Support */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-white mb-6">Support</h4>
              <ul className="space-y-3">
                <li><a href="/track" className="text-neutral-400 hover:text-hux-turquoise transition-colors text-sm">Help Center</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-hux-turquoise transition-colors text-sm">Sizing</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-hux-turquoise transition-colors text-sm">Recycling Program</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-hux-turquoise transition-colors text-sm">Flexible Spending</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-hux-turquoise transition-colors text-sm">Heart Rate Monitoring</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-hux-turquoise transition-colors text-sm">My Account</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-hux-turquoise transition-colors text-sm">HUX on the Web</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-hux-turquoise transition-colors text-sm">Contact</a></li>
              </ul>
            </div>

            {/* Partner With Us */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-white mb-6">Partner With Us</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-neutral-400 hover:text-hux-turquoise transition-colors text-sm">For Organizations</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-hux-turquoise transition-colors text-sm">Partnerships</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-hux-turquoise transition-colors text-sm">Developers</a></li>
              </ul>
            </div>
          </div>

          {/* Connect Section */}
          <div className="border-t border-neutral-700 pt-12 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Social Media */}
              <div>
                <h4 className="text-lg font-bold text-white mb-6">Connect</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <a href="#" className="text-neutral-400 hover:text-hux-turquoise transition-colors text-sm block">The Pulse Blog</a>
                    <a href="#" className="text-neutral-400 hover:text-hux-turquoise transition-colors text-sm block">Facebook</a>
                    <a href="#" className="text-neutral-400 hover:text-hux-turquoise transition-colors text-sm block">Instagram</a>
                    <a href="#" className="text-neutral-400 hover:text-hux-turquoise transition-colors text-sm block">Pinterest</a>
                  </div>
                  <div className="space-y-3">
                    <a href="#" className="text-neutral-400 hover:text-hux-turquoise transition-colors text-sm block">TikTok</a>
                    <a href="#" className="text-neutral-400 hover:text-hux-turquoise transition-colors text-sm block">X (Twitter)</a>
                    <a href="#" className="text-neutral-400 hover:text-hux-turquoise transition-colors text-sm block">YouTube</a>
                  </div>
                </div>
              </div>

              {/* Legal Links */}
              <div>
                <h4 className="text-lg font-bold text-white mb-6">Legal</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <a href="/terms-and-conditions" className="text-neutral-400 hover:text-hux-turquoise transition-colors text-sm block">Terms & Conditions</a>
                    <a href="/privacy-policy" className="text-neutral-400 hover:text-hux-turquoise transition-colors text-sm block">Privacy Policy</a>
                    <a href="#" className="text-neutral-400 hover:text-hux-turquoise transition-colors text-sm block">Accessibility</a>
                  </div>
                  <div className="space-y-3">
                    <a href="#" className="text-neutral-400 hover:text-hux-turquoise transition-colors text-sm block">FCC Compliance</a>
                    <a href="#" className="text-neutral-400 hover:text-hux-turquoise transition-colors text-sm block">IP Notice</a>
                    <a href="#" className="text-neutral-400 hover:text-hux-turquoise transition-colors text-sm block">Security Center</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="border-t border-neutral-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-xs text-neutral-500 text-center md:text-left">
                © 2025 Viveon Gizit Pvt Ltd. All rights reserved. HUX are trademark of Viveon Gizit Pvt Ltd and may not be used without permission.
              </p>
              <div className="flex items-center gap-6">
                <span className="text-xs text-neutral-500">Made in India</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-hux-turquoise rounded-full animate-pulse"></div>
                  <span className="text-xs text-neutral-500">Engineered for Tomorrow</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* STICKY ADD TO CART BAR */}
      <div className={`fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-lg border-t border-neutral-200 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] transform transition-transform duration-500 z-40 flex items-center justify-between lg:justify-center gap-6 ${showStickyBar ? 'translate-y-0' : 'translate-y-full'}`}>
         <div className="hidden lg:block text-hux-dark text-left">
            <span className="font-display font-bold text-lg block">HUX Smart Ring</span>
            <span className="text-xs text-neutral-500">The Future of Wellness</span>
         </div>
         <div className="flex items-center gap-4 w-full lg:w-auto justify-between lg:justify-start">
            <span className="font-bold text-hux-dark text-lg">₹12,999</span>
            <Button variant="primary" onClick={() => scrollToSection('collection')} className="shadow-lg shadow-hux-turquoise/20 px-8 py-2.5 text-sm">
              Add to Cart
            </Button>
         </div>
      </div>

    </div>
  );
};
