# HUX Smart Ring - Designer's Guide

## Image Assets & Specifications

### 📁 Directory Structure
```
/public/images/
├── logo.png                    # Main HUX logo
├── ring-animation.gif          # Product animation
├── 5ATM Water Proof.mp4       # Background video
├── heroSection/               # Hero carousel images
├── productImages/             # Product variants
├── features/                  # Feature icons/images
├── dock/                     # Charging dock images
├── Grid-Spec/               # Technical specs
└── banners/                 # CTA banners
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

### 5. Charging Dock Carousel
**Location:** `/public/images/dock/`
- **Files:** `dock001.png`, `dock002.png`, `dock003.png`, `dock004.png`, `coupleRings001.png`
- **Size:** 600x400px (3:2 ratio)
- **Format:** PNG
- **Usage:** Auto-rotating carousel

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

## 🎯 Design Guidelines

### Color Palette

#### Primary Brand Colors
```css
/* HUX Turquoise Family */
--hux-turquoise: #02b3d9          /* Primary brand color */
--hux-turquoise-dark: #0090af     /* Hover states, depth */
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

### Typography
- **Display:** Montserrat (headings)
- **Body:** Inter (content)
- **Script:** Great Vibes (decorative)

### Image Optimization
- **Web Format:** WebP preferred, PNG fallback
- **Compression:** 80-90% quality
- **Mobile:** Provide @2x versions for retina
- **Loading:** Lazy loading implemented

## 📱 Responsive Considerations

### Breakpoints
- **Mobile:** 320px - 768px
- **Tablet:** 768px - 1024px
- **Desktop:** 1024px+

### Mobile Adaptations
- Hero images: 16:9 → 4:3 crop
- Product grids: Stack vertically
- Carousels: Horizontal scroll with snap

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

## 📋 Asset Delivery Format

### File Structure
```
assets-delivery/
├── original/          # Full resolution originals
├── web-optimized/     # Compressed for web
├── mobile/           # Mobile-specific crops
└── specs.txt         # Dimensions and usage notes
```

### Handoff Requirements
- Adobe XD/Figma source files
- Asset export settings documented
- Color codes and fonts specified
- Animation timing notes
- Responsive behavior guidelines