# HUX Smart Ring - Developer's Code Walkthrough

## 🏗️ Project Architecture

### Tech Stack
- **Frontend:** React 18 + TypeScript + Vite
- **Styling:** TailwindCSS + Custom CSS
- **Routing:** React Router DOM v6
- **State:** React Context API
- **Database:** Supabase (PostgreSQL)
- **Payments:** Razorpay
- **AI:** Google Gemini API
- **3D/AR:** Three.js + MediaPipe
- **Animations:** GSAP + Framer Motion

### File Structure
```
src/
├── components/           # Reusable UI components
├── context/             # Global state management
├── pages/               # Route components
├── services/            # External API integrations
├── lib/                 # Utility libraries
├── types.ts             # TypeScript definitions
├── constants.ts         # App constants
└── utils.ts             # Helper functions

public/
├── images/              # Static assets
└── index.html           # Entry point
```

## 🧩 Core Components

### 1. Layout System (`components/Layout.tsx`)
```typescript
// Navbar with glassmorphism effect
export const Navbar = () => {
  // Fixed positioning with backdrop blur
  // Responsive mobile menu
  // Cart count badge
  // Logo centering
}

// Footer with comprehensive links
export const Footer = () => {
  // Company information
  // Social media links
  // Legal pages
}
```

### 2. Shopping Context (`context/ShopContext.tsx`)
```typescript
interface ShopContextType {
  cart: CartItem[];
  addToCart: (color: ProductColor, size: RingSize) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  placeRazorpayOrder: () => Promise<void>;
  verifyPayment: (details: PaymentDetails) => Promise<boolean>;
}
```

**Key Features:**
- localStorage persistence
- Quantity management
- Size/color variants
- Payment integration

### 3. Button Component (`components/Button.tsx`)
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}
```

**Variants:**
- `primary`: HUX turquoise gradient
- `secondary`: Neutral styling
- `outline`: Border-only design
- `glass`: Glassmorphism effect

## 📄 Page Components

### 1. Home Page (`pages/Home.tsx`)
**Sections:**
- Hero carousel (GSAP animations)
- 360° product view (CSS 3D transforms)
- Expandable capability cards
- Product collection grid
- Charging dock carousel
- Smart ecosystem accordion
- Video integration
- Expanding gallery
- Product specifications
- Unboxing experience
- Sizing guide
- Customer reviews (Masonry grid)
- CTA footer

**Key Features:**
```typescript
// State management for interactive elements
const [expandedCard, setExpandedCard] = useState<string | null>(null);
const [activeTab, setActiveTab] = useState(0);
const [rotation, setRotation] = useState(0);
const [isDragging, setIsDragging] = useState(false);

// Scroll-based sticky bar
const [showStickyBar, setShowStickyBar] = useState(false);
useEffect(() => {
  const handleScroll = () => {
    const threshold = window.innerHeight * 0.8;
    setShowStickyBar(window.scrollY > threshold);
  };
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

### 2. Shopping Bag (`pages/YourBag.tsx`)
**Features:**
- Cart item management
- Size selection (circular buttons)
- Quantity controls
- Pricing calculations
- Sizing kit option
- Empty cart state
- Premium creamy theme

### 3. Checkout (`pages/Checkout.tsx`)
**Two-step process:**
1. **Information:** Shipping details form
2. **Payment:** Razorpay integration

```typescript
// Payment method selection
const paymentMethods = [
  { id: 'upi', name: 'UPI', icon: Smartphone },
  { id: 'card', name: 'Card', icon: CreditCard },
  { id: 'cod', name: 'Cash on Delivery', icon: Truck }
];
```

## 🎨 Styling System

### 1. TailwindCSS Configuration
```javascript
// Custom colors in index.html
colors: {
  hux: {
    turquoise: '#02b3d9',
    turquoiseDark: '#0090af',
    turquoiseLight: '#18c5cc',
    gold: '#d4af37',
    ivory: '#fdfbf6',
    dark: '#1f2937'
  }
}
```

### 2. Glassmorphism Utilities
```css
.glass {
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.5);
}

.glass-card {
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
}
```

### 3. Mobile Corner Cuts
```css
@media (max-width: 768px) {
  .mobile-corner-cut {
    clip-path: polygon(8px 0%, 100% 0%, 100% calc(100% - 8px), 
                       calc(100% - 8px) 100%, 0% 100%, 0% 8px);
  }
}
```

## 🔌 Backend & External Integrations

### 1. Supabase Database Setup

#### Client Configuration (`lib/supabaseClient.ts`)
```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  db: {
    schema: 'public'
  }
});
```

#### Database Schema
```sql
-- Products table
CREATE TABLE products (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price_inr INTEGER NOT NULL,
  mrp_inr INTEGER,
  description TEXT,
  features JSONB,
  specs JSONB,
  images JSONB,
  colors TEXT[],
  sizes INTEGER[],
  stock_quantity INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  razorpay_order_id TEXT UNIQUE NOT NULL,
  razorpay_payment_id TEXT,
  amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'INR',
  status TEXT DEFAULT 'created',
  customer_info JSONB,
  shipping_info JSONB,
  items JSONB NOT NULL,
  payment_method TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order items table
CREATE TABLE order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id BIGINT REFERENCES products(id),
  quantity INTEGER NOT NULL,
  color TEXT,
  size INTEGER,
  unit_price INTEGER NOT NULL,
  total_price INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Row Level Security (RLS)
```sql
-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Products policies
CREATE POLICY "Allow public read access on products" ON products
FOR SELECT USING (is_active = true);

-- Orders policies
CREATE POLICY "Allow order creation" ON orders
FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow order updates for payment" ON orders
FOR UPDATE USING (true);

-- Order items policies
CREATE POLICY "Allow order items creation" ON order_items
FOR INSERT WITH CHECK (true);
```

### 2. Razorpay Payment Integration

#### Frontend Payment Flow (`context/ShopContext.tsx`)
```typescript
interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  order_id: string;
  name: string;
  description: string;
  image: string;
  prefill: {
    method: 'upi' | 'card' | 'netbanking';
  };
  theme: {
    color: string;
  };
  handler: (response: RazorpayResponse) => void;
  modal: {
    ondismiss: () => void;
  };
}

const placeRazorpayOrder = async () => {
  try {
    setIsProcessing(true);
    
    // Step 1: Create order via edge function
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/hux-pay`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({
        productId: HUX_PRODUCT.id,
        items: cart,
        customerInfo: checkoutData,
        amount: totalAmount * 100 // Convert to paise
      })
    });

    if (!response.ok) {
      throw new Error('Failed to create order');
    }

    const data = await response.json();
    
    // Step 2: Initialize Razorpay
    const options: RazorpayOptions = {
      key: data.key,
      amount: data.amount,
      currency: data.currency,
      order_id: data.razorpayOrderId,
      name: 'HUX Smart Ring',
      description: 'Intelligence. Worn.',
      image: '/images/logo.png',
      prefill: {
        method: selectedPaymentMethod
      },
      theme: {
        color: '#02b3d9'
      },
      handler: async (response: RazorpayResponse) => {
        await verifyPayment({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          orderId: data.orderId
        });
      },
      modal: {
        ondismiss: () => {
          setIsProcessing(false);
          console.log('Payment cancelled by user');
        }
      }
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
    
  } catch (error) {
    console.error('Payment initiation failed:', error);
    setIsProcessing(false);
  }
};
```

#### Payment Verification
```typescript
interface PaymentDetails {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  orderId: string;
}

const verifyPayment = async (details: PaymentDetails): Promise<boolean> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/verify-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify(details)
    });

    const result = await response.json();
    
    if (result.success) {
      // Clear cart and redirect to success page
      setCart([]);
      localStorage.removeItem('hux-cart');
      navigate(`/success/${details.orderId}`);
      return true;
    } else {
      throw new Error(result.error || 'Payment verification failed');
    }
  } catch (error) {
    console.error('Payment verification failed:', error);
    return false;
  }
};
```

### 3. Supabase Edge Functions

#### Payment Creation Function (`supabase/functions/hux-pay/index.ts`)
```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import Razorpay from "npm:razorpay@2.9.2";
import { corsHeaders } from '../_shared/cors.ts';

interface PaymentRequest {
  productId: number;
  items: CartItem[];
  customerInfo: CustomerInfo;
  amount: number;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { productId, items, customerInfo, amount }: PaymentRequest = await req.json();
    
    // Initialize Razorpay
    const razorpay = new Razorpay({
      key_id: Deno.env.get('RAZORPAY_KEY_ID')!,
      key_secret: Deno.env.get('RAZORPAY_KEY_SECRET')!,
    });

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: amount, // Amount in paise
      currency: 'INR',
      receipt: `hux_${Date.now()}`,
      notes: {
        productId: productId.toString(),
        customerEmail: customerInfo.email,
        itemCount: items.length.toString()
      }
    });

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Insert order into database
    const { data: order, error } = await supabase
      .from('orders')
      .insert({
        razorpay_order_id: razorpayOrder.id,
        amount: amount,
        currency: 'INR',
        status: 'created',
        customer_info: customerInfo,
        items: items,
        payment_method: null
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }

    return new Response(JSON.stringify({
      success: true,
      orderId: order.id,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key: Deno.env.get('RAZORPAY_KEY_ID')
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
    
  } catch (error) {
    console.error('Payment creation error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
```

#### Payment Verification Function (`supabase/functions/verify-payment/index.ts`)
```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { createHmac } from "https://deno.land/std@0.168.0/node/crypto.ts";
import { corsHeaders } from '../_shared/cors.ts';

interface VerificationRequest {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  orderId: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId }: VerificationRequest = await req.json();
    
    // Verify signature
    const secret = Deno.env.get('RAZORPAY_KEY_SECRET')!;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = createHmac('sha256', secret)
      .update(body)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      throw new Error('Invalid payment signature');
    }

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Update order status
    const { error } = await supabase
      .from('orders')
      .update({
        razorpay_payment_id: razorpay_payment_id,
        status: 'completed',
        updated_at: new Date().toISOString()
      })
      .eq('id', orderId)
      .eq('razorpay_order_id', razorpay_order_id);

    if (error) {
      throw new Error(`Database update error: ${error.message}`);
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Payment verified successfully'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
    
  } catch (error) {
    console.error('Payment verification error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
```

#### CORS Configuration (`supabase/functions/_shared/cors.ts`)
```typescript
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
};
```

### 4. Environment Variables
```bash
# Frontend (.env.local)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
GEMINI_API_KEY=your-gemini-key

# Supabase Edge Functions
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
RAZORPAY_KEY_ID=rzp_live_your-key-id
RAZORPAY_KEY_SECRET=your-secret-key
```

### 5. Error Handling
```typescript
// Custom error types
class PaymentError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = 'PaymentError';
  }
}

class DatabaseError extends Error {
  constructor(message: string, public query?: string) {
    super(message);
    this.name = 'DatabaseError';
  }
}

// Error boundary for payment flows
const handlePaymentError = (error: Error) => {
  if (error instanceof PaymentError) {
    // Show user-friendly payment error
    showToast('Payment failed. Please try again.', 'error');
  } else if (error instanceof DatabaseError) {
    // Log database errors for debugging
    console.error('Database error:', error);
    showToast('Something went wrong. Please contact support.', 'error');
  } else {
    // Generic error handling
    console.error('Unexpected error:', error);
    showToast('An unexpected error occurred.', 'error');
  }
};
```

### 6. API Response Types
```typescript
// Razorpay API responses
interface RazorpayOrderResponse {
  id: string;
  entity: 'order';
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string;
  status: 'created' | 'attempted' | 'paid';
  attempts: number;
  notes: Record<string, string>;
  created_at: number;
}

interface RazorpayPaymentResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

// Supabase database types
interface DatabaseOrder {
  id: string;
  razorpay_order_id: string;
  razorpay_payment_id?: string;
  amount: number;
  currency: string;
  status: 'created' | 'completed' | 'failed';
  customer_info: CustomerInfo;
  items: CartItem[];
  created_at: string;
  updated_at: string;
}

interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
}
```

### 7. AR Try-On (`components/ARTryOn.tsx`)
```typescript
// MediaPipe hand tracking
const handLandmarker = await HandLandmarker.createFromOptions(vision, {
  baseOptions: {
    modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',
    delegate: "GPU"
  },
  runningMode: "VIDEO",
  numHands: 1
});
```

## 🎭 Animation Systems

### 1. GSAP Hero Carousel (`components/AnimatedSections.tsx`)
```typescript
useEffect(() => {
  const tl = gsap.timeline({ repeat: -1 });
  
  sections.forEach((_, index) => {
    tl.to(`.hero-section-${index}`, {
      opacity: index === 0 ? 1 : 0,
      duration: 1,
      ease: "power2.inOut"
    });
  });
}, []);
```

### 2. Scroll Animations
```typescript
// Intersection Observer for fade-in effects
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fadeIn');
    }
  });
}, observerOptions);
```

## 🗃️ Data Management

### 1. Constants (`constants.ts`)
```typescript
export const HUX_PRODUCT: Product = {
  id: 3,
  name: 'HUX Smart Ring',
  price: 12999,
  mrp: 22999,
  features: [...],
  specs: {...}
};

export const FAQ_DATA: FAQ[] = [...];
```

### 2. Type Definitions (`types.ts`)
```typescript
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  features: string[];
  specs: ProductSpecs;
}

export interface CartItem {
  id: string;
  color: ProductColor;
  size: RingSize;
  quantity: number;
}
```

### 8. Database Queries
```typescript
// Product queries
const getProduct = async (id: number) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .eq('is_active', true)
    .single();
    
  if (error) throw new DatabaseError(error.message);
  return data;
};

// Order queries
const getOrder = async (orderId: string) => {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (
        *,
        products (*)
      )
    `)
    .eq('id', orderId)
    .single();
    
  if (error) throw new DatabaseError(error.message);
  return data;
};

// Create order with items
const createOrderWithItems = async (orderData: Partial<DatabaseOrder>, items: CartItem[]) => {
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert(orderData)
    .select()
    .single();
    
  if (orderError) throw new DatabaseError(orderError.message);
  
  const orderItems = items.map(item => ({
    order_id: order.id,
    product_id: HUX_PRODUCT.id,
    quantity: item.quantity,
    color: item.color,
    size: item.size,
    unit_price: HUX_PRODUCT.price,
    total_price: HUX_PRODUCT.price * item.quantity
  }));
  
  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems);
    
  if (itemsError) throw new DatabaseError(itemsError.message);
  
  return order;
};
```

## 🔧 Development Workflow

### 1. Environment Setup
```bash
npm install
cp .env.example .env.local
# Add your API keys
npm run dev
```

### 2. Build Process
```bash
npm run build    # Production build
npm run preview  # Preview build locally
```

### 3. Code Standards
- **TypeScript:** Strict mode enabled
- **ESLint:** Airbnb configuration
- **Prettier:** Code formatting
- **Husky:** Pre-commit hooks

## 🧪 Testing Strategy

### 1. Component Testing
- React Testing Library
- Jest for unit tests
- Cypress for E2E testing

### 2. Performance Testing
- Lighthouse CI
- Bundle analyzer
- Core Web Vitals monitoring

## 🚀 Optimization Techniques

### 1. Code Splitting
```typescript
// Lazy loading for routes
const Home = lazy(() => import('./pages/Home'));
const Checkout = lazy(() => import('./pages/Checkout'));
```

### 2. Image Optimization
- WebP format with PNG fallback
- Lazy loading implementation
- Responsive image sizing

### 3. Performance Monitoring
- React DevTools Profiler
- Web Vitals tracking
- Error boundary implementation

## 🔍 Debugging Tips

### 1. Common Issues
- **Hydration errors:** Check SSR compatibility
- **Route issues:** Verify BrowserRouter setup
- **Payment failures:** Check Razorpay configuration
- **Image loading:** Verify public folder structure

### 2. Development Tools
- React Developer Tools
- Redux DevTools (if using Redux)
- Network tab for API debugging
- Console for error tracking