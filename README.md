# HUX Smart Ring - Complete Project Guide

<div align="center">
  <img src="public/images/logo.png" alt="HUX Logo" width="200"/>
  
  **Intelligence. Worn.**
  
  *The convergence of luxury and biometric technology*
</div>

---

## 📋 Project Overview

HUX Smart Ring is a premium e-commerce platform showcasing an innovative smart ring with advanced health monitoring capabilities. Built with modern web technologies, it features a sophisticated design system, seamless payment integration, and cutting-edge AR try-on functionality.

### 🎯 Key Features
- **Premium Design System** - Glassmorphism UI with mobile corner cuts
- **E-commerce Functionality** - Complete shopping cart and checkout flow
- **Payment Integration** - Razorpay with UPI, Card, and COD options
- **AR Try-On** - MediaPipe-powered virtual ring fitting
- **Responsive Design** - Mobile-first approach with adaptive layouts
- **Performance Optimized** - Lazy loading, code splitting, and CDN delivery

## 🗂️ Documentation Structure

This project includes comprehensive documentation for different team members:

### 📖 Documentation Files

| File | Audience | Purpose |
|------|----------|---------|
| **[README-DESIGNERS.md](./README-DESIGNERS.md)** | Designers & Creative Team | Image specifications, asset requirements, brand guidelines |
| **[README-DEVELOPERS.md](./README-DEVELOPERS.md)** | Developers & Engineers | Code architecture, component structure, API integrations |
| **[README-DEPLOYMENT.md](./README-DEPLOYMENT.md)** | DevOps & Deployment Team | Infrastructure setup, deployment process, monitoring |
| **[README.md](./README.md)** | Everyone | Project overview, quick start, and navigation guide |

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd hux-smart-ring

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your API keys to .env.local

# Start development server
npm run dev
```

### Environment Variables
```bash
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
GEMINI_API_KEY=your-gemini-api-key
```

## 🏗️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **React Router** - Client-side routing

### Backend & Services
- **Supabase** - PostgreSQL database with real-time features
- **Razorpay** - Payment processing
- **Google Gemini** - AI-powered features
- **Vercel** - Hosting and deployment

### Specialized Libraries
- **Three.js** - 3D graphics and AR
- **MediaPipe** - Hand tracking for AR try-on
- **GSAP** - High-performance animations
- **Framer Motion** - React animation library

## 🎨 Design System

### Color Palette
```css
--hux-turquoise: #02b3d9      /* Primary brand color */
--hux-turquoise-light: #18c5cc /* Secondary accent */
--hux-gold: #d4af37           /* Premium accent */
--hux-ivory: #fdfbf6          /* Background */
--hux-dark: #1f2937           /* Text color */
```

### Typography
- **Display Font:** Montserrat (headings, logos)
- **Body Font:** Inter (content, UI)
- **Script Font:** Great Vibes (decorative elements)

### Key Design Elements
- **Glassmorphism** - Translucent cards with backdrop blur
- **Mobile Corner Cuts** - Subtle geometric edges on mobile
- **Premium Gradients** - Sophisticated color transitions
- **Micro-interactions** - Smooth hover and click animations

## 📱 Features Overview

### 🛍️ E-commerce Core
- **Product Showcase** - Interactive 3D product views
- **Shopping Cart** - Persistent cart with size/color variants
- **Checkout Flow** - Two-step process with multiple payment options
- **Order Management** - Order tracking and confirmation

### 🎯 Advanced Features
- **AR Try-On** - Virtual ring fitting using hand tracking
- **360° Product View** - Interactive product rotation
- **Size Guide** - Comprehensive fitting instructions
- **AI Assistant** - Gemini-powered customer support

### 📊 User Experience
- **Responsive Design** - Optimized for all device sizes
- **Performance** - Sub-3s load times with lazy loading
- **Accessibility** - WCAG 2.1 AA compliant
- **SEO Optimized** - Meta tags and structured data

## 🔧 Development Workflow

### Available Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run deploy   # Deploy to Vercel
```

### Complete Folder Structure
```
hux-smart-ring/
├── components/                    # Reusable UI components
│   ├── AnimatedSections.tsx      # GSAP hero carousel
│   ├── ARTryOn.tsx               # MediaPipe AR try-on
│   ├── Button.tsx                # Multi-variant button system
│   ├── CartDrawer.tsx            # Shopping cart drawer
│   ├── ConciergeAI.tsx           # Gemini AI assistant
│   ├── Layout.tsx                # Navbar and footer
│   └── MasonryGrid.tsx           # Pinterest-style grid
├── context/                      # Global state management
│   └── ShopContext.tsx           # Cart and payment state
├── lib/                          # Utility libraries
│   └── supabaseClient.ts         # Database client
├── pages/                        # Route components
│   ├── Checkout.tsx              # Two-step checkout flow
│   ├── Home.tsx                  # Main landing page
│   ├── OrderSuccess.tsx          # Payment success page
│   ├── preOrderTermsAndConditions.tsx # Legal terms
│   ├── PrivacyPolicy.tsx         # Privacy policy
│   ├── StaticPages.tsx           # About and support pages
│   ├── TermsAndConditions.tsx    # Terms of service
│   └── YourBag.tsx               # Shopping cart page
├── services/                     # External API integrations
│   └── geminiService.ts          # AI service integration
├── src/                          # Duplicate structure (legacy)
│   ├── components/
│   ├── context/
│   ├── lib/
│   └── pages/
├── supabase/                     # Backend configuration
│   ├── functions/                # Edge functions
│   │   └── hux-pay/             # Payment processing
│   │       └── index.ts
│   ├── .temp/                    # CLI temporary files
│   └── schema.sql               # Database schema
├── public/                       # Static assets
│   ├── images/                   # Image assets
│   │   ├── banners/             # CTA background images
│   │   │   └── evolve.png
│   │   ├── dock/                # Charging dock images
│   │   │   ├── dock001.png
│   │   │   ├── dock002.png
│   │   │   ├── dock003.png
│   │   │   ├── dock004.png
│   │   │   └── coupleRings001.png
│   │   ├── features/            # Feature icons
│   │   │   ├── Gesture.png
│   │   │   ├── HRV.png
│   │   │   ├── Intense.png
│   │   │   ├── smart.png
│   │   │   ├── SOS.png
│   │   │   ├── Stress.png
│   │   │   └── Yoga.png
│   │   ├── Grid-Spec/           # Technical specifications
│   │   │   └── sensors.gif
│   │   ├── heroSection/         # Hero carousel images
│   │   │   ├── hero-01.png
│   │   │   ├── hero-02.png
│   │   │   └── hero-03.png
│   │   └── productImages/       # Product variants
│   │       ├── goldImages/
│   │       │   ├── gold01.png
│   │       │   ├── gold02.png
│   │       │   └── gold03.png
│   │       └── tarnishImages/
│   │           ├── tarnish01.png
│   │           ├── tarnish02.png
│   │           └── tarnish03.png
│   ├── icons/                   # App icons and favicons
│   ├── logo.png                 # Main HUX logo
│   ├── ring-animation.gif       # Product animation
│   └── 5ATM Water Proof.mp4     # Background video
├── .env.local                   # Environment variables
├── .gitignore                   # Git ignore rules
├── App.tsx                      # Main app component
├── constants.ts                 # App constants and data
├── index.css                    # Global styles
├── index.html                   # HTML entry point
├── index.tsx                    # React entry point
├── metadata.json                # App metadata
├── package.json                 # Dependencies and scripts
├── package-lock.json            # Dependency lock file
├── setup_database.sql           # Database setup script
├── supabase_rls_fix.sql        # RLS policy fixes
├── tsconfig.json               # TypeScript configuration
├── types.ts                    # TypeScript type definitions
├── utils.ts                    # Utility functions
├── vercel.json                 # Vercel deployment config
├── vite.config.ts              # Vite build configuration
├── README.md                   # Main project documentation
├── README-DESIGNERS.md         # Designer's guide
├── README-DEVELOPERS.md        # Developer's guide
└── README-DEPLOYMENT.md        # Deployment guide
```

## 🎭 Component Architecture

### Core Components
- **Layout** - Navigation and footer with glassmorphism
- **Button** - Multi-variant button system
- **ARTryOn** - MediaPipe-powered AR experience
- **MasonryGrid** - Pinterest-style layout system
- **AnimatedSections** - GSAP-powered hero carousel

### Page Components
- **Home** - Landing page with 12+ interactive sections
- **YourBag** - Shopping cart with premium styling
- **Checkout** - Two-step checkout with payment integration
- **StaticPages** - Legal pages and company information

## 🔌 Integrations

### Payment Processing
- **Razorpay** - Indian payment gateway
- **Multiple Methods** - UPI, Cards, Cash on Delivery
- **Secure Processing** - PCI DSS compliant

### Database
- **Supabase** - PostgreSQL with real-time features
- **Row Level Security** - Secure data access
- **Edge Functions** - Serverless payment processing

### AI & AR
- **Google Gemini** - AI-powered customer assistance
- **MediaPipe** - Hand tracking for AR try-on
- **Three.js** - 3D product visualization

## 📈 Performance Metrics

### Core Web Vitals
- **LCP** - < 2.5s (Largest Contentful Paint)
- **FID** - < 100ms (First Input Delay)
- **CLS** - < 0.1 (Cumulative Layout Shift)

### Optimization Techniques
- **Code Splitting** - Route-based lazy loading
- **Image Optimization** - WebP format with lazy loading
- **Bundle Analysis** - Optimized chunk sizes
- **CDN Delivery** - Global edge network

## 🔒 Security Features

### Data Protection
- **Environment Variables** - Secure API key management
- **HTTPS Enforcement** - SSL/TLS encryption
- **Content Security Policy** - XSS protection
- **Input Validation** - Sanitized user inputs

### Payment Security
- **PCI Compliance** - Secure payment processing
- **Tokenization** - No card data storage
- **3D Secure** - Additional authentication layer

## 🌍 Browser Support

### Supported Browsers
- **Chrome** 90+ ✅
- **Firefox** 88+ ✅
- **Safari** 14+ ✅
- **Edge** 90+ ✅

### Mobile Support
- **iOS Safari** 14+ ✅
- **Chrome Mobile** 90+ ✅
- **Samsung Internet** 14+ ✅

## 📞 Team Contacts & Roles

### Development Team
- **Frontend Lead** - React/TypeScript development
- **Backend Lead** - Supabase/API integration
- **UI/UX Designer** - Design system and assets
- **DevOps Engineer** - Deployment and monitoring

### Getting Help

#### For Designers 👨‍🎨
📖 **Read:** [README-DESIGNERS.md](./README-DESIGNERS.md)
- Image specifications and requirements
- Brand guidelines and color palette
- Asset delivery formats

#### For Developers 👨‍💻
📖 **Read:** [README-DEVELOPERS.md](./README-DEVELOPERS.md)
- Code architecture and patterns
- Component documentation
- API integration guides

#### For DevOps 🚀
📖 **Read:** [README-DEPLOYMENT.md](./README-DEPLOYMENT.md)
- Infrastructure setup
- Deployment procedures
- Monitoring and maintenance

## 🎯 Project Roadmap

### Phase 1 - Core Platform ✅
- [x] E-commerce functionality
- [x] Payment integration
- [x] Responsive design
- [x] Basic AR features

### Phase 2 - Enhanced Features 🚧
- [ ] Advanced AR try-on
- [ ] AI-powered recommendations
- [ ] Social sharing features
- [ ] Multi-language support

### Phase 3 - Scale & Optimize 📋
- [ ] Performance optimization
- [ ] Advanced analytics
- [ ] A/B testing framework
- [ ] International expansion

## 📄 License & Legal

### Copyright
© 2025 Viveon Gizit Pvt Ltd. All rights reserved.

### Trademarks
HUX are trademark of Viveon Gizit Pvt Ltd and may not be used without permission.

### Third-Party Licenses
- React - MIT License
- TailwindCSS - MIT License
- Three.js - MIT License
- MediaPipe - Apache 2.0 License

---

<div align="center">
  <p><strong>Built with ❤️ by the HUX Team</strong></p>
  <p><em>Intelligence. Worn.</em></p>
</div>