# HUX Smart Ring - Deployment Guide

## 🚀 Deployment Architecture

### Tech Stack Overview
```
Frontend: React 18 + TypeScript + Vite + PWA
Hosting: Vercel (Recommended) / Netlify
Database: Supabase (PostgreSQL) with enhanced schema
Payments: Razorpay with split payment support
CDN: Vercel Edge Network with global distribution
Domain: Custom domain support
SSL: Automatic HTTPS with security headers
PWA: Service Worker + Web Manifest
Monitoring: Enhanced analytics and error tracking
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

# Razorpay (Frontend only - Key ID)
VITE_RAZORPAY_KEY_ID=rzp_test_your-key-id

# Gemini AI (Optional - for AI features)
GEMINI_API_KEY=your-gemini-api-key
```

#### Supabase Edge Function Secrets
```bash
# Set these in Supabase (not in frontend .env)
supabase secrets set RAZORPAY_KEY_ID=rzp_test_your-key-id
supabase secrets set RAZORPAY_KEY_SECRET=your-secret-key

# Zoho OAuth for email (Zoho Mail API)
supabase secrets set ZOHO_CLIENT_ID=your-client-id
supabase secrets set ZOHO_CLIENT_SECRET=your-client-secret
supabase secrets set ZOHO_REFRESH_TOKEN=your-refresh-token
supabase secrets set ZOHO_ACCOUNT_ID=your-account-id
```

**Note:** Email system uses Zoho Mail API with OAuth2 (not SMTP). See ZOHO_OAUTH_SETUP.md for setup instructions.

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

#### Two Edge Functions Required

**1. Payment Processing (`hux-pay`)**
- Creates Razorpay orders
- Verifies payment signatures
- Updates order status in database
- Triggers email notifications

**2. Email Service (`send-email`)**
- Sends emails via Zoho Mail API
- Uses OAuth2 for authentication
- Handles order confirmations, VIP signups, payment failures

#### Deploy Edge Functions
```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Deploy both functions
supabase functions deploy hux-pay --no-verify-jwt
supabase functions deploy send-email --no-verify-jwt
```

**Note:** The `--no-verify-jwt` flag is required for frontend requests.

#### Email Configuration
Emails are sent from:
- `orders@hux.co.in` - Order confirmations
- `vip@hux.co.in` - VIP/Pre-launch signups
- `payments@hux.co.in` - Payment failures

All emails reply to: `support@hux.co.in`

See `DEPLOYMENT_GUIDE.md` and `ZOHO_OAUTH_SETUP.md` for complete setup instructions.

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

## 📞 Enhanced Support & Maintenance

### Monitoring & Alerting
- **Uptime:** Vercel provides 99.99% uptime SLA with multi-region monitoring
- **Logs:** Available in Vercel dashboard with real-time streaming
- **Metrics:** Real-time performance monitoring with Core Web Vitals
- **Error Tracking:** Comprehensive error monitoring with stack traces
- **PWA Metrics:** Service worker performance and installation rates
- **Business Metrics:** Pre-launch bookings, influencer signups, conversion rates
- **Database Monitoring:** Query performance and connection health
- **Payment Monitoring:** Transaction success rates and failure analysis

### Automated Updates & Maintenance
- **Dependencies:** Automated security updates with Dependabot
- **Content:** Dynamic content management through Supabase
- **Features:** Staged deployment with feature flags
- **Database Migrations:** Automated schema updates
- **PWA Updates:** Automatic service worker updates
- **Performance Optimization:** Continuous bundle analysis and optimization
- **Security Scanning:** Regular vulnerability assessments

### Incident Response
- **Escalation Procedures:** Defined response times and contacts
- **Rollback Strategy:** Automated rollback for critical issues
- **Communication Plan:** Customer notification via multiple channels
- **Post-Incident Analysis:** Root cause analysis and prevention measures

### Backup & Recovery
- **Database Backups:** Daily automated backups with 30-day retention
- **Code Repository:** Git-based version control with branch protection
- **Asset Backups:** CDN-cached assets with multiple replicas
- **Configuration Backups:** Environment variables and settings backup
- **Disaster Recovery:** Multi-region failover capabilities

## 🚀 **Enhanced Deployment Checklist**

### Infrastructure Verification
- [ ] Vercel project configured with correct settings
- [ ] Supabase project setup with enhanced schema
- [ ] Database migrations applied successfully
- [ ] Edge functions deployed and tested
- [ ] Environment variables configured for all services
- [ ] PWA manifest and service worker configured
- [ ] CDN caching rules optimized
- [ ] Security headers implemented

### Feature Testing
- [ ] Pre-launch booking system operational
- [ ] Influencer signup and tracking functional
- [ ] Payment processing (regular and split payments)
- [ ] AR try-on functionality working
- [ ] Email notification system active
- [ ] PWA installation and offline functionality
- [ ] Mobile responsiveness across devices
- [ ] Core Web Vitals within target ranges

### Security & Performance
- [ ] SSL certificate active with HSTS
- [ ] Content Security Policy configured
- [ ] Rate limiting implemented
- [ ] Database RLS policies active
- [ ] Payment webhook security verified
- [ ] Error monitoring and alerting configured
- [ ] Performance monitoring active
- [ ] Backup procedures tested