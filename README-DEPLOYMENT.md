# HUX Smart Ring - Deployment Guide

## 🚀 Deployment Architecture

### Tech Stack Overview
```
Frontend: React 18 + TypeScript + Vite
Hosting: Vercel (Recommended) / Netlify
Database: Supabase (PostgreSQL)
Payments: Razorpay
CDN: Vercel Edge Network
Domain: Custom domain support
SSL: Automatic HTTPS
```

## 🏗️ Infrastructure Setup

### 1. Vercel Deployment (Recommended)

#### Prerequisites
- GitHub/GitLab repository
- Vercel account
- Domain name (optional)

#### Deployment Steps
```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy from project root
vercel

# 4. Follow prompts:
# - Link to existing project? No
# - Project name: hux-smart-ring
# - Directory: ./
# - Override settings? No
```

#### Vercel Configuration (`vercel.json`)
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

### 2. Environment Variables

#### Required Variables
```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Gemini AI (Optional - for AI features)
GEMINI_API_KEY=your-gemini-api-key

# Razorpay (Set in Supabase Edge Functions)
RAZORPAY_KEY_ID=rzp_live_your-key-id
RAZORPAY_KEY_SECRET=your-secret-key
```

#### Setting Environment Variables in Vercel
1. Go to Vercel Dashboard
2. Select your project
3. Navigate to Settings → Environment Variables
4. Add each variable with appropriate scope (Production/Preview/Development)

### 3. Database Setup (Supabase)

#### Database Schema
```sql
-- Products table
CREATE TABLE products (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price_inr INTEGER NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  razorpay_order_id TEXT UNIQUE NOT NULL,
  amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'INR',
  status TEXT DEFAULT 'created',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert HUX product
INSERT INTO products (id, name, price_inr, description) VALUES 
(3, 'HUX Smart Ring', 12999, 'Intelligence. Worn.');
```

#### Row Level Security (RLS)
```sql
-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Allow public read access to products
CREATE POLICY "Allow public read access on products" ON products
FOR SELECT USING (true);

-- Allow authenticated users to create orders
CREATE POLICY "Allow order creation" ON orders
FOR INSERT WITH CHECK (true);
```

### 4. Edge Functions (Supabase)

#### Payment Processing (`supabase/functions/hux-pay/index.ts`)
```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Razorpay from "npm:razorpay@2.9.2";

const razorpay = new Razorpay({
  key_id: Deno.env.get('RAZORPAY_KEY_ID')!,
  key_secret: Deno.env.get('RAZORPAY_KEY_SECRET')!,
});

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { productId } = await req.json();
    
    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: 1299900, // ₹12,999 in paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    });

    return new Response(JSON.stringify({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: Deno.env.get('RAZORPAY_KEY_ID')
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
```

#### Deploy Edge Functions
```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Deploy functions
supabase functions deploy hux-pay --project-ref your-project-ref
```

## 🔧 Build Configuration

### Vite Configuration (`vite.config.ts`)
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['lucide-react', 'framer-motion']
        }
      }
    }
  },
  server: {
    port: 3000,
    host: true
  }
});
```

### Package.json Scripts
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "vercel --prod"
  }
}
```

## 🌐 Domain & SSL Setup

### Custom Domain Configuration
1. **Add Domain in Vercel:**
   - Go to Project Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

2. **DNS Configuration:**
   ```
   Type: CNAME
   Name: www (or @)
   Value: cname.vercel-dns.com
   ```

3. **SSL Certificate:**
   - Automatically provisioned by Vercel
   - Let's Encrypt certificate
   - Auto-renewal enabled

## 📊 Performance Optimization

### 1. Build Optimization
```bash
# Analyze bundle size
npm run build
npx vite-bundle-analyzer dist

# Optimize images
npm install -g imagemin-cli
imagemin public/images/* --out-dir=public/images/optimized
```

### 2. CDN Configuration
- **Vercel Edge Network:** Global CDN automatically enabled
- **Image Optimization:** Automatic WebP conversion
- **Caching Headers:** Configured for static assets

### 3. Core Web Vitals
```javascript
// Performance monitoring
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

## 🔒 Security Configuration

### 1. Security Headers
```javascript
// In vercel.json
"headers": [
  {
    "source": "/(.*)",
    "headers": [
      {
        "key": "X-Frame-Options",
        "value": "DENY"
      },
      {
        "key": "X-Content-Type-Options",
        "value": "nosniff"
      },
      {
        "key": "Referrer-Policy",
        "value": "origin-when-cross-origin"
      },
      {
        "key": "Permissions-Policy",
        "value": "camera=(), microphone=(), geolocation=()"
      }
    ]
  }
]
```

### 2. Environment Security
- Never commit `.env` files
- Use Vercel's environment variable encryption
- Rotate API keys regularly
- Enable Supabase RLS policies

## 📈 Monitoring & Analytics

### 1. Vercel Analytics
```bash
# Install Vercel Analytics
npm install @vercel/analytics

# Add to main component
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <>
      <YourApp />
      <Analytics />
    </>
  );
}
```

### 2. Error Tracking
```typescript
// Error boundary implementation
class ErrorBoundary extends React.Component {
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log to monitoring service
    console.error('Error caught by boundary:', error, errorInfo);
  }
}
```

## 🚨 Troubleshooting

### Common Deployment Issues

#### 1. Build Failures
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### 2. Environment Variable Issues
- Check variable names (VITE_ prefix required)
- Verify values in Vercel dashboard
- Restart deployment after changes

#### 3. Routing Issues
- Ensure `vercel.json` rewrites are configured
- Check React Router setup
- Verify public folder structure

#### 4. Payment Integration Issues
- Verify Razorpay keys in Supabase
- Check CORS configuration
- Test in Razorpay dashboard

### Performance Issues
```bash
# Lighthouse audit
npm install -g lighthouse
lighthouse https://your-domain.com --view

# Bundle analysis
npm run build
npx webpack-bundle-analyzer dist
```

## 📋 Deployment Checklist

### Pre-Deployment
- [ ] Environment variables configured
- [ ] Database schema deployed
- [ ] Edge functions deployed
- [ ] Images optimized
- [ ] Build passes locally
- [ ] Tests passing

### Post-Deployment
- [ ] Site loads correctly
- [ ] All routes working
- [ ] Payment flow tested
- [ ] Mobile responsiveness verified
- [ ] Performance metrics acceptable
- [ ] Error monitoring active

### Production Readiness
- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] Analytics tracking enabled
- [ ] Error boundaries implemented
- [ ] Security headers configured
- [ ] Backup strategy in place

## 🔄 CI/CD Pipeline

### GitHub Actions (Optional)
```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 📞 Support & Maintenance

### Monitoring
- **Uptime:** Vercel provides 99.99% uptime SLA
- **Logs:** Available in Vercel dashboard
- **Metrics:** Real-time performance monitoring

### Updates
- **Dependencies:** Regular security updates
- **Content:** CMS integration for dynamic content
- **Features:** Staged deployment for new features