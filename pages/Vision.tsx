import React, { useEffect, useState } from 'react';
import { ChevronDown, Brain, Heart, Zap, Shield, Globe, Sparkles, ArrowRight, Play } from 'lucide-react';

const Vision = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [activeHealthTab, setActiveHealthTab] = useState('HRV_ANALYSIS');
  const [activeInnovationTab, setActiveInnovationTab] = useState('EMERGENCY_SOS');

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxScroll) * 100;
      setScrollProgress(progress);

      // Update active section based on scroll position
      const sections = ['hero', 'vision', 'innovation', 'luxury', 'health', 'empowerment', 'ecosystem'];
      const sectionElements = sections.map(id => document.getElementById(id));
      
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const element = sectionElements[i];
        if (element && element.getBoundingClientRect().top <= 100) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-hux-ivory">
      {/* Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-white/20 z-50">
        <div 
          className="h-full bg-gradient-to-r from-hux-turquoise to-hux-gold transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Navigation */}
      <nav className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
        <div className="glass rounded-2xl p-4 space-y-3">
          {[
            { id: 'hero', label: 'Vision' },
            { id: 'innovation', label: 'Innovation' },
            { id: 'luxury', label: 'Luxury' },
            { id: 'health', label: 'Health' },
            { id: 'empowerment', label: 'Empowerment' },
            { id: 'ecosystem', label: 'Ecosystem' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeSection === item.id 
                  ? 'bg-gradient-to-r from-hux-turquoise to-hux-gold scale-125' 
                  : 'bg-neutral-300 hover:bg-hux-turquoise'
              }`}
              title={item.label}
            />
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/images/banners/evolve.png" 
            alt="Futuristic Smart Ring" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-hux-turquoise/20 via-transparent to-hux-gold/20" />
          <div className="absolute top-1/4 left-1/4 w-32 h-32 md:w-64 md:h-64 bg-gradient-to-r from-hux-turquoise/10 to-hux-gold/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 md:w-96 md:h-96 bg-gradient-to-l from-hux-gold/10 to-hux-turquoise/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="max-w-6xl mx-auto px-4 md:px-6 text-center relative z-10">
          <div className="glass mobile-corner-cut p-6 md:p-12 lg:p-16">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-hux-dark mb-6">
              Intelligence.
              <span className="block bg-gradient-to-r from-hux-turquoise to-hux-gold bg-clip-text text-transparent">
                Worn.
              </span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-neutral-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Redefining how humanity understands health through the convergence of luxury design and revolutionary biometric intelligence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => scrollToSection('vision')}
                className="px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-hux-turquoise to-hux-gold text-white font-bold rounded-full hover:shadow-lg hover:shadow-hux-turquoise/25 transition-all duration-300 flex items-center gap-2"
              >
                Explore Our Vision <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-hux-turquoise" size={32} />
        </div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="py-12 md:py-16 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="glass mobile-corner-cut p-6 md:p-12 lg:p-16">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-hux-dark mb-6">
                  The Future of 
                  <span className="text-hux-turquoise"> Personal Health</span>
                </h2>
                <p className="text-base md:text-lg text-neutral-600 mb-6 leading-relaxed">
                  We envision a world where advanced health intelligence seamlessly integrates into daily life through elegant, powerful wearable technology. HUX represents the pinnacle of this vision—where luxury meets innovation.
                </p>
                <p className="text-base md:text-lg text-neutral-600 leading-relaxed">
                  Our mission transcends traditional health monitoring. We're creating an ecosystem that transforms raw biometric data into actionable insights, empowering individuals to optimize their wellbeing with unprecedented precision and style.
                </p>
              </div>
              <div className="relative">
                <div className="w-60 h-60 md:w-80 md:h-80 mx-auto relative group">
                  <img 
                    src="/images/features/smart.png" 
                    alt="Smart Ring Technology" 
                    className="w-full h-full object-cover rounded-full opacity-80 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-hux-turquoise/30 to-hux-gold/30 rounded-full animate-pulse" />
                  <div className="absolute inset-4 glass rounded-full flex items-center justify-center">
                    <Brain className="text-white drop-shadow-lg" size={80} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Innovation Section */}
      <section id="innovation" className="py-12 md:py-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-hux-dark mb-6">
              Innovation <span className="text-hux-gold">Leadership</span>
            </h2>
            <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto">
              Pioneering breakthrough technologies that set new standards in intelligent wearables and health monitoring.
            </p>
          </div>

          {/* Innovation Feature Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { id: 'NEURAL_PROCESSING', label: "NEURAL PROCESSING" },
              { id: 'BIOMETRIC_SENSORS', label: "BIOMETRIC SENSORS" },
              { id: 'GESTURE_CONTROL', label: "GESTURE CONTROL" },
              { id: 'EMERGENCY_SOS', label: "EMERGENCY SOS" }
            ].map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveInnovationTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-xs font-bold tracking-wide transition-all duration-300 ${
                  activeInnovationTab === tab.id 
                    ? 'bg-hux-turquoise text-white shadow-lg' 
                    : 'bg-white/50 text-neutral-600 hover:bg-white/70'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Dynamic Innovation Content */}
          <div className="glass mobile-corner-cut p-8 md:p-12 mb-12">
            {activeInnovationTab === 'NEURAL_PROCESSING' && (
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="relative">
                  <img 
                    src="/images/dock/dock001.png" 
                    alt="Neural Processing" 
                    className="w-full h-80 object-cover rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl font-display font-bold mb-2">Real-Time Analytics</h3>
                    <p className="text-white/90">Processing millions of data points per second</p>
                  </div>
                </div>
                <div>
                  <div className="mb-6">
                    <div className="w-4 h-12 bg-hux-turquoise rounded-full mb-4" />
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-hux-dark mb-4">Neural Processing</h3>
                    <p className="text-neutral-600 mb-6 leading-relaxed">
                      Our proprietary neural processing unit delivers real-time health analytics with unprecedented accuracy, processing millions of data points per second while maintaining exceptional battery efficiency.
                    </p>
                  </div>
                  <div className="space-y-4">
                    {[
                      "Real-time biometric analysis with sub-second latency",
                      "Adaptive learning algorithms that improve accuracy over time",
                      "Energy-efficient processing extending battery life to 7+ days",
                      "Secure on-device computation protecting your health data"
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-hux-turquoise rounded-full" />
                        <span className="text-neutral-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeInnovationTab === 'BIOMETRIC_SENSORS' && (
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="relative">
                  <img 
                    src="/images/features/HRV.png" 
                    alt="Biometric Sensors" 
                    className="w-full h-80 object-cover rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl font-display font-bold mb-2">Medical-Grade Sensors</h3>
                    <p className="text-white/90">Advanced optical technology in compact form</p>
                  </div>
                </div>
                <div>
                  <div className="mb-6">
                    <div className="w-4 h-12 bg-hux-turquoise rounded-full mb-4" />
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-hux-dark mb-4">Biometric Sensors</h3>
                    <p className="text-neutral-600 mb-6 leading-relaxed">
                      Medical-grade sensor array featuring advanced optical technology, temperature monitoring, and motion detection, all integrated into a compact, comfortable form factor.
                    </p>
                  </div>
                  <div className="space-y-4">
                    {[
                      "Multi-wavelength PPG for accurate heart rate and SpO2",
                      "Continuous temperature monitoring with ±0.1°C precision",
                      "Advanced motion sensors for activity and sleep tracking",
                      "Galvanic skin response for stress level detection"
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-hux-turquoise rounded-full" />
                        <span className="text-neutral-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeInnovationTab === 'GESTURE_CONTROL' && (
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="relative">
                  <img 
                    src="/images/productImages/goldImages/gold01.png" 
                    alt="Gesture Control" 
                    className="w-full h-80 object-cover rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl font-display font-bold mb-2">Natural Interaction</h3>
                    <p className="text-white/90">Seamless control through hand movements</p>
                  </div>
                </div>
                <div>
                  <div className="mb-6">
                    <div className="w-4 h-12 bg-hux-turquoise rounded-full mb-4" />
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-hux-dark mb-4">Gesture Control</h3>
                    <p className="text-neutral-600 mb-6 leading-relaxed">
                      Intuitive gesture recognition system enabling seamless interaction with your device and smart home ecosystem through natural hand movements.
                    </p>
                  </div>
                  <div className="space-y-4">
                    {[
                      "Natural gesture recognition with 99% accuracy",
                      "Customizable gesture commands for personal preferences",
                      "Smart home integration with major platforms",
                      "Discreet control without touching your phone"
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-hux-turquoise rounded-full" />
                        <span className="text-neutral-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeInnovationTab === 'EMERGENCY_SOS' && (
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="relative">
                  <img 
                    src="/images/dock/dock002.png" 
                    alt="Emergency SOS" 
                    className="w-full h-80 object-cover rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl font-display font-bold mb-2">Instant Alerts</h3>
                    <p className="text-white/90">One-touch emergency notification to contacts and services</p>
                  </div>
                </div>
                <div>
                  <div className="mb-6">
                    <div className="w-4 h-12 bg-hux-turquoise rounded-full mb-4" />
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-hux-dark mb-4">Emergency SOS</h3>
                    <p className="text-neutral-600 mb-6 leading-relaxed">
                      Advanced safety system with automatic fall detection, emergency contact alerts, and location sharing, providing peace of mind for you and your loved ones.
                    </p>
                  </div>
                  <div className="space-y-4">
                    {[
                      "Automatic fall detection with impact analysis",
                      "One-touch emergency contact notification",
                      "Real-time GPS location sharing",
                      "Integration with emergency services"
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-hux-turquoise rounded-full" />
                        <span className="text-neutral-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Innovation Stats */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                value: "50+",
                label: "PATENTS FILED",
                color: "text-hux-turquoise"
              },
              {
                value: "99.8%",
                label: "ACCURACY RATE",
                color: "text-hux-turquoise"
              },
              {
                value: "7 Days",
                label: "BATTERY LIFE",
                color: "text-hux-turquoise"
              },
              {
                value: "24/7",
                label: "MONITORING",
                color: "text-hux-turquoise"
              }
            ].map((stat, index) => (
              <div key={index} className="text-center p-6">
                <div className={`text-4xl md:text-5xl font-display font-bold ${stat.color} mb-2`}>
                  {stat.value}
                </div>
                <div className="text-sm text-neutral-500 font-medium tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Luxury Section */}
      <section id="luxury" className="py-12 md:py-16 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="glass mobile-corner-cut p-6 md:p-12 lg:p-16">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="relative order-2 lg:order-1">
                <div className="w-60 h-60 md:w-80 md:h-80 mx-auto relative group">
                  <img 
                    src="/images/features/Yoga.png" 
                    alt="Luxury Gold Ring" 
                    className="w-full h-full object-cover rounded-full opacity-90 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-hux-gold/40 to-hux-turquoise/40 rounded-full animate-pulse" />
                  <div className="absolute inset-4 glass rounded-full flex items-center justify-center">
                    <Sparkles className="text-white drop-shadow-lg" size={80} />
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-hux-dark mb-6">
                  Luxury Meets
                  <span className="text-hux-gold"> Technology</span>
                </h2>
                <p className="text-base md:text-lg text-neutral-600 mb-6 leading-relaxed">
                  Premium materials including 18k gold plating and aerospace-grade titanium create a wearable that's as beautiful as it is intelligent. Every detail reflects our commitment to craftsmanship excellence.
                </p>
                <p className="text-base md:text-lg text-neutral-600 leading-relaxed">
                  The HUX Smart Ring isn't just a device—it's a statement piece that seamlessly blends into your lifestyle while delivering unprecedented health insights with luxury-grade durability and style.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Health Intelligence Section */}
      <section id="health" className="py-12 md:py-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-hux-dark mb-6">
              Holistic <span className="text-hux-turquoise">Health Intelligence</span>
            </h2>
            <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto">
              Comprehensive health monitoring that provides actionable insights for optimizing your physical and mental well-being.
            </p>
          </div>

          {/* Health Feature Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { id: 'HRV_ANALYSIS', icon: <Heart size={20} />, label: "HRV ANALYSIS" },
              { id: 'STRESS_MONITORING', icon: <Zap size={20} />, label: "STRESS MONITORING" },
              { id: 'SLEEP_TRACKING', icon: <Brain size={20} />, label: "SLEEP TRACKING" },
              { id: 'RECOVERY_INSIGHTS', icon: <Shield size={20} />, label: "RECOVERY INSIGHTS" },
              { id: 'GESTURE_CONTROL', icon: <Globe size={20} />, label: "GESTURE CONTROL" },
              { id: 'EMERGENCY_SOS', icon: <Heart size={20} />, label: "EMERGENCY SOS" }
            ].map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveHealthTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-xs font-bold tracking-wide transition-all duration-300 ${
                  activeHealthTab === tab.id 
                    ? 'bg-hux-turquoise text-white shadow-lg' 
                    : 'bg-white/50 text-neutral-600 hover:bg-white/70'
                }`}
              >
                <div className="flex items-center gap-2">
                  {tab.icon}
                  {tab.label}
                </div>
              </button>
            ))}
          </div>

          {/* Dynamic Health Content */}
          <div className="glass mobile-corner-cut p-8 md:p-12 mb-12">
            {activeHealthTab === 'HRV_ANALYSIS' && (
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-hux-turquoise rounded-lg flex items-center justify-center">
                      <Heart className="text-white" size={24} />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-hux-dark">HRV Analysis</h3>
                  </div>
                  <p className="text-neutral-600 mb-6 leading-relaxed">
                    Advanced heart rate variability monitoring provides deep insights into your autonomic nervous system, stress levels, and recovery status, helping you optimize training and rest.
                  </p>
                  <div className="space-y-4">
                    {[
                      "Continuous HRV tracking throughout day and night",
                      "Stress resilience scoring and trend analysis",
                      "Recovery readiness recommendations",
                      "Personalized training zone optimization"
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-hux-turquoise rounded-full" />
                        <span className="text-neutral-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <div className="bg-gradient-to-br from-hux-gold to-hux-turquoise p-6 rounded-2xl">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-white/80 text-sm font-medium">AVERAGE HRV</span>
                        <span className="text-white text-xl font-bold">45ms</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div className="bg-white h-2 rounded-full" style={{width: '75%'}}></div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/80 text-sm font-medium">RECOVERY SCORE</span>
                        <span className="text-white text-xl font-bold">82%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div className="bg-white h-2 rounded-full" style={{width: '82%'}}></div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/80 text-sm font-medium">STRESS LEVEL</span>
                        <span className="text-white text-xl font-bold">Low</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div className="bg-white h-2 rounded-full" style={{width: '25%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeHealthTab === 'STRESS_MONITORING' && (
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-hux-turquoise rounded-lg flex items-center justify-center">
                      <Zap className="text-white" size={24} />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-hux-dark">Stress Monitoring</h3>
                  </div>
                  <p className="text-neutral-600 mb-6 leading-relaxed">
                    Real-time stress detection using multiple biometric signals helps you identify stress triggers and provides guided breathing exercises for immediate relief.
                  </p>
                  <div className="space-y-4">
                    {[
                      "Continuous stress level monitoring with alerts",
                      "Trigger identification and pattern recognition",
                      "Guided breathing exercises for stress reduction",
                      "Daily stress summary and weekly trends"
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-hux-turquoise rounded-full" />
                        <span className="text-neutral-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <div className="bg-gradient-to-br from-hux-gold to-hux-turquoise p-6 rounded-2xl">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-white/80 text-sm font-medium">CURRENT STRESS</span>
                        <span className="text-white text-xl font-bold">Low</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div className="bg-white h-2 rounded-full" style={{width: '30%'}}></div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/80 text-sm font-medium">DAILY AVERAGE</span>
                        <span className="text-white text-xl font-bold">Moderate</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div className="bg-white h-2 rounded-full" style={{width: '60%'}}></div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/80 text-sm font-medium">CALM MINUTES</span>
                        <span className="text-white text-xl font-bold">340</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div className="bg-white h-2 rounded-full" style={{width: '85%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeHealthTab === 'SLEEP_TRACKING' && (
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-hux-turquoise rounded-lg flex items-center justify-center">
                      <Brain className="text-white" size={24} />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-hux-dark">Sleep Tracking</h3>
                  </div>
                  <p className="text-neutral-600 mb-6 leading-relaxed">
                    Comprehensive sleep analysis tracks all sleep stages, providing personalized recommendations to improve sleep quality and optimize recovery.
                  </p>
                  <div className="space-y-4">
                    {[
                      "Automatic sleep detection and stage classification",
                      "Sleep quality scoring with detailed breakdown",
                      "Smart alarm for optimal wake timing",
                      "Sleep environment recommendations"
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-hux-turquoise rounded-full" />
                        <span className="text-neutral-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <div className="bg-gradient-to-br from-hux-gold to-hux-turquoise p-6 rounded-2xl">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-white/80 text-sm font-medium">SLEEP SCORE</span>
                        <span className="text-white text-xl font-bold">88</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div className="bg-white h-2 rounded-full" style={{width: '88%'}}></div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/80 text-sm font-medium">DEEP SLEEP</span>
                        <span className="text-white text-xl font-bold">2.3h</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div className="bg-white h-2 rounded-full" style={{width: '75%'}}></div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/80 text-sm font-medium">REM SLEEP</span>
                        <span className="text-white text-xl font-bold">1.8h</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div className="bg-white h-2 rounded-full" style={{width: '65%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeHealthTab === 'RECOVERY_INSIGHTS' && (
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-hux-turquoise rounded-lg flex items-center justify-center">
                      <Shield className="text-white" size={24} />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-hux-dark">Recovery Insights</h3>
                  </div>
                  <p className="text-neutral-600 mb-6 leading-relaxed">
                    Holistic recovery assessment combining sleep quality, HRV, and activity data to provide daily readiness scores and training recommendations.
                  </p>
                  <div className="space-y-4">
                    {[
                      "Daily readiness score based on multiple factors",
                      "Personalized training intensity recommendations",
                      "Recovery time estimation after workouts",
                      "Long-term fitness trend analysis"
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-hux-turquoise rounded-full" />
                        <span className="text-neutral-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <div className="bg-gradient-to-br from-hux-gold to-hux-turquoise p-6 rounded-2xl">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-white/80 text-sm font-medium">READINESS</span>
                        <span className="text-white text-xl font-bold">95%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div className="bg-white h-2 rounded-full" style={{width: '95%'}}></div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/80 text-sm font-medium">RECOVERY TIME</span>
                        <span className="text-white text-xl font-bold">12h</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div className="bg-white h-2 rounded-full" style={{width: '60%'}}></div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/80 text-sm font-medium">FITNESS TREND</span>
                        <span className="text-white text-xl font-bold">+8%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div className="bg-white h-2 rounded-full" style={{width: '80%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeHealthTab === 'GESTURE_CONTROL' && (
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-hux-turquoise rounded-lg flex items-center justify-center">
                      <Globe className="text-white" size={24} />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-hux-dark">Gesture Control</h3>
                  </div>
                  <p className="text-neutral-600 mb-6 leading-relaxed">
                    Intuitive gesture recognition enables seamless device control and smart home interaction through natural hand movements.
                  </p>
                  <div className="space-y-4">
                    {[
                      "Customizable gesture commands for common actions",
                      "Smart home device control without phone",
                      "Music and call control with simple gestures",
                      "Camera shutter and timer activation"
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-hux-turquoise rounded-full" />
                        <span className="text-neutral-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <div className="bg-gradient-to-br from-hux-gold to-hux-turquoise p-6 rounded-2xl">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-white/80 text-sm font-medium">RECOGNITION RATE</span>
                        <span className="text-white text-xl font-bold">98%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div className="bg-white h-2 rounded-full" style={{width: '98%'}}></div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/80 text-sm font-medium">RESPONSE TIME</span>
                        <span className="text-white text-xl font-bold">0.2s</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div className="bg-white h-2 rounded-full" style={{width: '90%'}}></div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/80 text-sm font-medium">GESTURES LEARNED</span>
                        <span className="text-white text-xl font-bold">12</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div className="bg-white h-2 rounded-full" style={{width: '85%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeHealthTab === 'EMERGENCY_SOS' && (
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-hux-turquoise rounded-lg flex items-center justify-center">
                      <Shield className="text-white" size={24} />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-hux-dark">Emergency SOS</h3>
                  </div>
                  <p className="text-neutral-600 mb-6 leading-relaxed">
                    Advanced safety features including automatic fall detection and emergency contact notification provide peace of mind for you and your loved ones.
                  </p>
                  <div className="space-y-4">
                    {[
                      "Automatic fall detection with impact analysis",
                      "One-touch emergency contact notification",
                      "Real-time location sharing with emergency contacts",
                      "Integration with local emergency services"
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-hux-turquoise rounded-full" />
                        <span className="text-neutral-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <div className="bg-gradient-to-br from-hux-gold to-hux-turquoise p-6 rounded-2xl">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-white/80 text-sm font-medium">DETECTION ACCURACY</span>
                        <span className="text-white text-xl font-bold">99.5%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div className="bg-white h-2 rounded-full" style={{width: '99%'}}></div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/80 text-sm font-medium">RESPONSE TIME</span>
                        <span className="text-white text-xl font-bold">&lt; 5s</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div className="bg-white h-2 rounded-full" style={{width: '95%'}}></div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/80 text-sm font-medium">FALSE POSITIVES</span>
                        <span className="text-white text-xl font-bold">0.1%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div className="bg-white h-2 rounded-full" style={{width: '5%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}


          </div>

          {/* Bottom Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Brain className="text-hux-turquoise" size={32} />,
                title: "Data-Driven Decisions",
                description: "Make informed choices about your health and fitness based on comprehensive biometric data."
              },
              {
                icon: <Sparkles className="text-hux-turquoise" size={32} />,
                title: "Personalized Insights",
                description: "Receive tailored recommendations that adapt to your unique physiology and lifestyle."
              },
              {
                icon: <Shield className="text-hux-turquoise" size={32} />,
                title: "Proactive Alerts",
                description: "Get notified of potential health concerns before they become serious issues."
              },
              {
                icon: <Zap className="text-hux-turquoise" size={32} />,
                title: "Goal Achievement",
                description: "Track progress toward your health and fitness goals with motivating visualizations."
              }
            ].map((item, index) => (
              <div key={index} className="text-center p-6">
                <div className="w-16 h-16 bg-hux-turquoise/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <h4 className="text-lg font-display font-bold text-hux-dark mb-3">{item.title}</h4>
                <p className="text-sm text-neutral-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* User Empowerment Section */}
      <section id="empowerment" className="py-12 md:py-16 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="glass mobile-corner-cut p-6 md:p-12 lg:p-16">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-hux-dark mb-6">
                Empowering <span className="text-hux-turquoise">Human Potential</span>
              </h2>
              <p className="text-lg md:text-xl text-neutral-600 mb-8 md:mb-12 max-w-4xl mx-auto leading-relaxed">
                We believe technology should enhance human capability, not complicate it. HUX transforms complex health data into clear, actionable insights that empower you to make informed decisions about your wellbeing.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 md:gap-8 mt-8 md:mt-12">
                <div className="text-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-hux-turquoise to-hux-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg md:text-xl">1</span>
                  </div>
                  <h3 className="text-base md:text-lg font-display font-bold text-hux-dark mb-2">Continuous Monitoring</h3>
                  <p className="text-sm md:text-base text-neutral-600">24/7 health tracking without disrupting your lifestyle</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-hux-turquoise to-hux-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg md:text-xl">2</span>
                  </div>
                  <h3 className="text-base md:text-lg font-display font-bold text-hux-dark mb-2">Intelligent Analysis</h3>
                  <p className="text-sm md:text-base text-neutral-600">AI-powered insights that learn and adapt to your patterns</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-hux-turquoise to-hux-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg md:text-xl">3</span>
                  </div>
                  <h3 className="text-base md:text-lg font-display font-bold text-hux-dark mb-2">Actionable Guidance</h3>
                  <p className="text-sm md:text-base text-neutral-600">Personalized recommendations for optimal health outcomes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future Ecosystem Section */}
      <section id="ecosystem" className="py-12 md:py-16 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="glass mobile-corner-cut p-6 md:p-12 lg:p-16">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-hux-dark mb-6">
                  Future <span className="text-hux-gold">Ecosystem</span>
                </h2>
                <p className="text-base md:text-lg text-neutral-600 mb-6 leading-relaxed">
                  The HUX Smart Ring is just the beginning. We're building a comprehensive ecosystem of intelligent wearables and health platforms that work together to provide unprecedented insights into human health and performance.
                </p>
                <p className="text-base md:text-lg text-neutral-600 mb-8 leading-relaxed">
                  From advanced sleep optimization to predictive health analytics, our vision extends far beyond a single device to create a complete health intelligence platform that evolves with you.
                </p>
                <button className="px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-hux-turquoise to-hux-gold text-white font-bold rounded-full hover:shadow-lg hover:shadow-hux-turquoise/25 transition-all duration-300 flex items-center gap-2">
                  Join the Future <ArrowRight size={20} />
                </button>
              </div>
              <div className="relative">
                <div className="w-60 h-60 md:w-80 md:h-80 mx-auto relative group">
                  <img 
                    src="/images/Grid-Spec/sensors.gif" 
                    alt="Connected Future Technology" 
                    className="w-full h-full object-cover rounded-full opacity-80 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-hux-turquoise/30 to-hux-gold/30 rounded-full animate-pulse" />
                  <div className="absolute inset-4 glass rounded-full flex items-center justify-center">
                    <Globe className="text-white drop-shadow-lg" size={80} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-12 md:py-16 px-4 md:px-6 bg-gradient-to-r from-hux-turquoise to-hux-gold">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
            Ready to Experience the Future?
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Join thousands of early adopters who are already transforming their health with HUX intelligence.
          </p>
          <button className="px-8 md:px-12 py-3 md:py-4 bg-white text-hux-dark font-bold rounded-full hover:shadow-xl transition-all duration-300 text-base md:text-lg">
            Pre-Order Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default Vision;