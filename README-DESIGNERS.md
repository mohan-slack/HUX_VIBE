# HUX Smart Ring - Designer's Guide

## Image Assets & Specifications

### 📁 Enhanced Directory Structure
```
/public/
├── images/
│   ├── logo.png                    # Main HUX logo
│   ├── ring-animation.gif          # Product animation
│   ├── hux-ring.png               # Ring product image for PWA
│   ├── 5ATM Water Proof.mp4       # Background video
│   ├── heroSection/               # Hero carousel images
│   ├── productImages/             # Product variants
│   ├── features/                  # Feature icons/images
│   ├── dock/                     # Enhanced charging dock images
│   │   ├── NewDock01.png         # New dock design
│   │   ├── haptic-Feature.png    # Haptic vibration feature
│   │   ├── smart-touch.png       # Smart touch controls
│   │   └── SOS-feature.png       # SOS emergency feature
│   ├── svgPlainRings/            # Ring illustrations for UI
│   │   └── ring-angle-3.png      # Ring illustration
│   ├── Grid-Spec/               # Technical specs
│   └── banners/                 # CTA banners
├── icons/                        # PWA icons
│   ├── icon-72x72.png
│   ├── icon-96x96.png
│   ├── icon-128x128.png
│   ├── icon-144x144.png
│   ├── icon-152x152.png
│   ├── icon-192x192.png
│   ├── icon-384x384.png
│   ├── icon-512x512.png
│   ├── shortcut-shop.png
│   ├── shortcut-track.png
│   └── shortcut-ar.png
├── manifest.json                 # PWA manifest
├── sw.js                        # Service worker
└── robots.txt                   # SEO robots file
```

## 🎨 Image Requirements by Section

### 1. Hero Section (Animated Carousel)
**Location:** `/public/images/heroSection/`
- **Files:** `hero-01.png`, `hero-02.png`, `hero-03.png`
- **Size:** 1920x1080px (16:9)
- **Format:** PNG with transparency
- **Usage:** Full-screen hero backgrounds with text overlay

### 2. Logo
**Location:** `/public/images/logo.png`
- **Size:** 200x60px (flexible height)
- **Format:** PNG with transparency
- **Usage:** Navbar, footer, branding

### 3. Product Images
**Location:** `/public/images/productImages/`
```
tarnishImages/
├── tarnish01.png    # Main hero (4:3 ratio, 800x600px)
├── tarnish02.png    # Detail 1 (1:1 ratio, 400x400px)
└── tarnish03.png    # Detail 2 (1:1 ratio, 400x400px)

goldImages/
├── gold01.png       # Main hero (4:3 ratio, 800x600px)
├── gold02.png       # Detail 1 (1:1 ratio, 400x400px)
└── gold03.png       # Detail 2 (1:1 ratio, 400x400px)
```

### 4. Feature Icons
**Location:** `/public/images/features/`
- **Files:** `smart.png`, `SOS.png`, `HRV.png`, `Stress.png`, `Yoga.png`, `Intense.png`, `Gesture.png`
- **Size:** 200x200px (1:1)
- **Format:** PNG with transparency
- **Style:** Minimalist icons with HUX brand colors

### 5. Enhanced Charging Dock Carousel
**Location:** `/public/images/dock/`
- **Original Files:** `dock001.png`, `dock002.png`, `dock003.png`, `dock004.png`, `coupleRings001.png`
- **New Feature Files:** 
  - `NewDock01.png` - Enhanced dock design
  - `haptic-Feature.png` - Haptic vibration motor visualization
  - `smart-touch.png` - Smart touch controls demonstration
  - `SOS-feature.png` - SOS emergency feature showcase
- **Size:** 600x400px (3:2 ratio)
- **Format:** PNG with WebP variants
- **Usage:** Auto-rotating carousel with dynamic content switching

### 6. Technical Specs
**Location:** `/public/images/Grid-Spec/`
- **Files:** `sensors.gif`
- **Size:** 400x400px (1:1)
- **Format:** GIF for animations, PNG for static

### 7. CTA Banners
**Location:** `/public/images/banners/`
- **Files:** `evolve.png`
- **Size:** 1920x800px (12:5 ratio)
- **Format:** PNG
- **Usage:** Full-width background with text overlay

### 8. Video Assets
**Location:** `/public/images/`
- **File:** `5ATM Water Proof.mp4`
- **Resolution:** 1920x1080 (16:9)
- **Duration:** 10-30 seconds loop
- **Format:** MP4, H.264 codec

### 9. PWA Assets
**Location:** `/public/icons/`

#### App Icons (Required Sizes)
- **72x72px** - `icon-72x72.png` (Android small)
- **96x96px** - `icon-96x96.png` (Android medium)
- **128x128px** - `icon-128x128.png` (Chrome Web Store)
- **144x144px** - `icon-144x144.png` (Android large)
- **152x152px** - `icon-152x152.png` (iPad)
- **192x192px** - `icon-192x192.png` (Android extra large)
- **384x384px** - `icon-384x384.png` (Android extra extra large)
- **512x512px** - `icon-512x512.png` (Splash screen)

#### Shortcut Icons
- **Shop:** `shortcut-shop.png` (96x96px) - Shopping bag icon
- **Track:** `shortcut-track.png` (96x96px) - Package tracking icon
- **AR:** `shortcut-ar.png` (96x96px) - AR try-on icon

#### Design Requirements
- **Format:** PNG with transparency
- **Background:** Transparent or solid brand color
- **Logo:** HUX logo centered with appropriate padding
- **Maskable:** Support for adaptive icons (safe area: 80% of canvas)
- **Style:** Consistent with brand identity

### 10. Ring Illustrations
**Location:** `/public/images/svgPlainRings/`
- **Files:** `ring-angle-3.png`
- **Size:** 200x200px (1:1)
- **Format:** PNG with transparency
- **Usage:** UI elements, influencer program graphics, icons
- **Style:** Simple, clean line art matching brand aesthetic

## 🎯 Enhanced Design Guidelines

### Color Palette

#### Primary Brand Colors
```css
/* HUX Turquoise Family */
--hux-turquoise: #02b3d9          /* Primary brand color */
--hux-turquoise-dark: #0891b2     /* Hover states, depth */
--hux-turquoise-light: #18c5cc    /* Secondary accent, highlights */
--hux-turquoise-50: #e6f7fb       /* Very light backgrounds */
--hux-turquoise-100: #b3e8f2      /* Light backgrounds */
--hux-turquoise-200: #80d9e9      /* Subtle accents */

/* HUX Gold Family */
--hux-gold: #d4af37               /* Premium accent color */
--hux-gold-dark: #b8941f          /* Darker gold variant */
--hux-gold-light: #f3e5ab         /* Light gold tint */
```

#### Background & Surface Colors
```css
/* Ivory Background System */
--hux-ivory: #fdfbf6              /* Main background */
--hux-body: #fdfbf6               /* Body background (same as ivory) */
--hux-ivory-dark: #f2efe9         /* Darker ivory variant */
--hux-ivory-light: #fefefe        /* Pure white alternative */

/* Neutral Grays */
--neutral-50: #fafaf9             /* Lightest gray */
--neutral-100: #f5f5f4            /* Very light gray */
--neutral-200: #e7e5e4            /* Light gray borders */
--neutral-300: #d6d3d1            /* Medium light gray */
--neutral-400: #a8a29e            /* Medium gray text */
--neutral-500: #78716c            /* Dark gray text */
--neutral-600: #57534e            /* Darker gray */
--neutral-700: #44403c            /* Very dark gray */
--neutral-800: #292524            /* Almost black */
--neutral-900: #1c1917            /* Darkest gray */
```

#### Text & Content Colors
```css
/* Text Hierarchy */
--hux-dark: #1f2937               /* Primary text color */
--text-primary: #1f2937           /* Headings, important text */
--text-secondary: #6b7280         /* Body text, descriptions */
--text-tertiary: #9ca3af          /* Subtle text, captions */
--text-inverse: #ffffff           /* White text on dark backgrounds */
```

#### Glassmorphism Colors
```css
/* Glass Effects */
--glass-bg: rgba(255, 255, 255, 0.65)     /* Main glass background */
--glass-border: rgba(255, 255, 255, 0.5)  /* Glass borders */
--glass-card: rgba(255, 255, 255, 0.4)    /* Card glass effect */
--glass-dark: rgba(0, 0, 0, 0.1)          /* Dark glass overlay */
```

#### Status & Feedback Colors
```css
/* Success States */
--success: #10b981                /* Success green */
--success-light: #d1fae5          /* Light success background */
--success-dark: #047857           /* Dark success variant */

/* Error States */
--error: #ef4444                  /* Error red */
--error-light: #fee2e2            /* Light error background */
--error-dark: #dc2626             /* Dark error variant */

/* Warning States */
--warning: #f59e0b                /* Warning orange */
--warning-light: #fef3c7          /* Light warning background */
--warning-dark: #d97706           /* Dark warning variant */

/* Info States */
--info: #3b82f6                   /* Info blue */
--info-light: #dbeafe             /* Light info background */
--info-dark: #1d4ed8              /* Dark info variant */
```

### Enhanced Typography System
- **Display:** Montserrat (headings, logos, brand elements)
- **Body:** Inter (content, UI elements, forms)
- **Script:** Great Vibes (decorative elements, special occasions)

#### Font Weights & Usage
```css
/* Montserrat - Display Font */
.font-display {
  font-family: 'Montserrat', sans-serif;
  font-weight: 300; /* Light - subtle headings */
  font-weight: 400; /* Regular - standard headings */
  font-weight: 500; /* Medium - emphasized headings */
  font-weight: 600; /* Semi-bold - important headings */
  font-weight: 700; /* Bold - hero text */
  font-weight: 800; /* Extra-bold - impact text */
}

/* Inter - Body Font */
.font-sans {
  font-family: 'Inter', sans-serif;
  font-weight: 300; /* Light - subtle text */
  font-weight: 400; /* Regular - body text */
  font-weight: 500; /* Medium - emphasized text */
  font-weight: 600; /* Semi-bold - labels */
}

/* Great Vibes - Script Font */
.font-script {
  font-family: 'Great Vibes', cursive;
  font-weight: 400; /* Regular - decorative text */
}
```

### Enhanced Image Optimization
- **Modern Formats:** AVIF > WebP > PNG/JPG (with fallbacks)
- **Compression:** 85-95% quality for AVIF/WebP, 80-90% for PNG/JPG
- **Responsive:** Provide 1x, 2x, 3x versions for different densities
- **Loading:** Lazy loading with intersection observer
- **PWA Optimization:** Optimized icons and splash screens
- **Critical Images:** Preload above-the-fold images
- **Blur-up Technique:** Low-quality placeholders while loading

## 📱 Enhanced Responsive Considerations

### Advanced Animation Effects
```css
/* Glassmorphism Effects */
.glass {
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
}

.glass-morphism {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

/* Tech Border Effects */
.tech-border {
  border: 1px solid;
  border-image: linear-gradient(45deg, #02b3d9, #d4af37) 1;
}

/* Neon Glow Effects */
.neon-glow {
  box-shadow: 
    0 0 5px currentColor,
    0 0 10px currentColor,
    0 0 15px currentColor,
    0 0 20px currentColor;
  animation: neon-pulse 2s ease-in-out infinite alternate;
}

@keyframes neon-pulse {
  from { box-shadow: 0 0 5px currentColor; }
  to { box-shadow: 0 0 20px currentColor, 0 0 30px currentColor; }
}

/* Floating Ring Animation */
.floating-ring {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(5deg); }
}

/* Mobile Corner Cuts */
@media (max-width: 768px) {
  .mobile-corner-cut {
    clip-path: polygon(8px 0%, 100% 0%, 100% calc(100% - 8px), 
                       calc(100% - 8px) 100%, 0% 100%, 0% 8px);
  }
  
  .mobile-corner-cut-subtle {
    clip-path: polygon(4px 0%, 100% 0%, 100% calc(100% - 4px), 
                       calc(100% - 4px) 100%, 0% 100%, 0% 4px);
  }
}
```

### Breakpoints
- **Mobile:** 320px - 768px
- **Tablet:** 768px - 1024px
- **Desktop:** 1024px+

### Enhanced Mobile Adaptations
- Hero images: 16:9 → 4:3 crop with smart cropping
- Product grids: Stack vertically with optimized spacing
- Carousels: Horizontal scroll with snap points and momentum
- PWA Features: App-like navigation and interactions
- Touch Gestures: Swipe, pinch-to-zoom, long-press support
- Offline States: Cached content and offline indicators
- Performance: Optimized for 3G networks and low-end devices

## 🔄 Enhanced Asset Management Process

### New Campaign Assets

#### Pre-Launch Campaign Graphics
- **Offer Banners:** ₹7,999 savings messaging with urgency indicators
- **Countdown Elements:** Timer graphics and scarcity messaging
- **Booking Flow:** Step-by-step visual guides and progress indicators
- **Email Templates:** Pre-launch update designs with production progress
- **Social Media:** Instagram stories, posts, and video thumbnails

#### Influencer Program Assets
- **Creator Portal:** Dashboard graphics and analytics visualizations
- **Commission Graphics:** 8% rate highlighting and earning potential displays
- **Onboarding Materials:** Welcome graphics and program guidelines
- **Social Templates:** Ready-to-use content templates for creators
- **Performance Badges:** Achievement graphics and milestone celebrations

#### Interactive Element Graphics
- **AR Try-On:** Hand tracking overlays and ring positioning guides
- **360° View:** Rotation hints and interaction cues
- **Loading States:** Smooth transitions and progress animations
- **Hover Effects:** Interactive feedback for all clickable elements
- **PWA Elements:** Installation prompts and offline indicators

## 🔄 Image Update Process

### Naming Convention
```
[section]-[variant]-[number].png
Example: product-tarnish-01.png
```

### Quality Checklist
- [ ] Correct dimensions
- [ ] Optimized file size (<500KB)
- [ ] Consistent lighting/style
- [ ] Brand colors accurate
- [ ] Transparency where needed
- [ ] Mobile-friendly composition

## 🎨 Brand Consistency

### Visual Style
- **Aesthetic:** Premium, minimalist, tech-forward
- **Mood:** Sophisticated, trustworthy, innovative
- **Lighting:** Soft, natural, high-contrast
- **Composition:** Clean, spacious, focused

### Color Usage Guidelines

#### Primary Color Applications
- **HUX Turquoise (#02b3d9):** CTAs, links, brand elements, progress indicators
- **Turquoise Light (#18c5cc):** Hover states, secondary buttons, highlights
- **Turquoise Dark (#0090af):** Active states, pressed buttons, depth

#### Background Color System
- **Ivory (#fdfbf6):** Main page backgrounds, content areas
- **White (#ffffff):** Cards, modals, overlays
- **Neutral 50 (#fafaf9):** Subtle section backgrounds
- **Neutral 100 (#f5f5f4):** Input fields, disabled states

#### Text Color Hierarchy
- **Primary Text (#1f2937):** Headings, important content
- **Secondary Text (#6b7280):** Body text, descriptions
- **Tertiary Text (#9ca3af):** Captions, metadata, subtle info
- **Inverse Text (#ffffff):** Text on dark backgrounds

#### Interactive Element Colors
```css
/* Button States */
.btn-primary {
  background: #02b3d9;          /* Default */
  background-hover: #0090af;    /* Hover */
  background-active: #007a94;   /* Active/Pressed */
}

/* Link States */
.link {
  color: #02b3d9;              /* Default */
  color-hover: #0090af;        /* Hover */
  color-visited: #6366f1;      /* Visited */
}

/* Form Elements */
.input {
  border: #e7e5e4;             /* Default border */
  border-focus: #02b3d9;       /* Focus border */
  background: #ffffff;         /* Background */
}
```

#### Gradient Combinations
```css
/* Brand Gradients */
.gradient-primary {
  background: linear-gradient(135deg, #02b3d9 0%, #18c5cc 100%);
}

.gradient-gold {
  background: linear-gradient(135deg, #d4af37 0%, #f3e5ab 100%);
}

.gradient-neutral {
  background: linear-gradient(135deg, #fdfbf6 0%, #f5f5f4 100%);
}
```

### Product Photography
- **Background:** Pure white or transparent
- **Lighting:** Studio lighting, no harsh shadows
- **Angles:** Multiple perspectives per variant
- **Details:** Close-ups of key features

## 📋 Enhanced Asset Delivery Format

### PWA Asset Specifications

#### Icon Requirements
```
Icon Sizes & Purposes:
- 72x72px   → Android Chrome (density 1.5x)
- 96x96px   → Android Chrome (density 2x)
- 128x128px → Chrome Web Store
- 144x144px → Android Chrome (density 3x)
- 152x152px → iPad touch icon
- 192x192px → Android Chrome (density 4x)
- 384x384px → Android splash screen
- 512x512px → High-res splash screen

Maskable Icon Requirements:
- Safe area: 80% of canvas (centered)
- Padding: 10% on all sides
- Background: Solid color or transparent
- Logo: Centered and properly sized
```

#### Shortcut Icon Specifications
```
Shortcut Icons (96x96px each):
- Shop Icon: Shopping bag with HUX branding
- Track Icon: Package/delivery truck icon
- AR Icon: Camera/AR symbol with ring

Design Guidelines:
- Simple, recognizable symbols
- Consistent with app icon style
- High contrast for visibility
- Optimized for small sizes
```

#### Splash Screen Assets
```
Splash Screen Sizes:
- iPhone SE: 640x1136px
- iPhone 8: 750x1334px
- iPhone 8 Plus: 1242x2208px
- iPhone X/11: 1125x2436px
- iPhone 12/13: 1170x2532px
- iPad: 1536x2048px
- Android (various): 1080x1920px, 1440x2560px

Design Elements:
- HUX logo centered
- Brand background color
- Loading indicator (optional)
- Consistent with app branding
```

## 📋 Asset Delivery Format

### File Structure
```
assets-delivery/
├── original/          # Full resolution originals
├── web-optimized/     # Compressed for web
├── mobile/           # Mobile-specific crops
└── specs.txt         # Dimensions and usage notes
```

### Enhanced Handoff Requirements
- **Design Files:** Adobe XD/Figma source files with organized layers
- **Asset Exports:** Automated export settings for multiple formats
- **Color System:** Complete color palette with hex codes and usage guidelines
- **Typography:** Font files and usage specifications
- **Animation Guidelines:** Timing, easing curves, and interaction patterns
- **Responsive Behavior:** Breakpoint specifications and adaptive layouts
- **PWA Assets:** Complete icon set and manifest specifications
- **Accessibility:** Alt text suggestions and contrast ratios
- **Performance Notes:** Optimization recommendations and loading priorities
- **Version Control:** Asset versioning system and update procedures

### Quality Assurance Checklist
- [ ] All required sizes provided
- [ ] Consistent brand colors across assets
- [ ] Proper file naming convention
- [ ] Optimized file sizes
- [ ] PWA compliance verified
- [ ] Accessibility standards met
- [ ] Cross-platform compatibility tested
- [ ] Animation performance validated
- [ ] Responsive behavior confirmed
- [ ] Loading states designed