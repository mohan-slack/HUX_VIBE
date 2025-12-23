import { Product, Review, FAQ } from './types';

export const HUX_PRODUCT: Product = {
  id: 3,
  name: 'HUX Smart Ring',
  tagline: 'Intelligence. Worn.',
  subtitle: 'The Smart Ecosystem',
  price: 12999,
  mrp: 22999,
  description: "A masterclass in miniaturization. The HUX Smart Ring combines Titanium Alloy durability with Liquid Glass elegance. Track your vitals, control your digital world with touch gestures, and optimize your recovery with AI.",
  features: [
    "Real-Time Health Dashboard",
    "Touch Control Suite",
    "AI Recovery Insights",
    "Sleep Stages & Readiness",
    "5ATM Waterproof (50m)",
    "Titanium Alloy Body"
  ],
  specs: {
    material: "Titanium Alloy with Liquid Glass Coating",
    battery: "25 mAh LiPo (Up to 7 Days)",
    waterproof: "5ATM (Up to 50m)",
    sensors: ["Optical Heart Rate", "SpO2", "Skin Temp", "3D Accelerometer"],
    connectivity: "Bluetooth 5.2 Low Energy",
    certifications: ["CE", "RoHS", "FCC", "REACH", "BIS", "ISO"]
  },
  reviews: []
};

export const REVIEWS_DATA: Review[] = [
  {
    id: 'r1',
    author: 'Sarah Jenkins',
    rating: 5,
    text: "The turquoise app interface is stunning, and the ring itself disappears on my finger. Sleep tracking is spot on.",
    verified: true,
    avatar: "/images/logo.png"
  },
  {
    id: 'r2',
    author: 'Michael Chen',
    rating: 5,
    text: "Switched from Apple Watch. I don't miss the notifications, but I love the data. The battery life is actually 7 days.",
    verified: true,
    avatar: "/images/logo.png"
  },
  {
    id: 'r3',
    author: 'Emma Wilson',
    rating: 4,
    text: "Elegant design. The gold accent looks premium. Integration with HealthKit works perfectly.",
    verified: true,
    avatar: "/images/logo.png"
  }
];

export const FAQ_DATA: FAQ[] = [
  {
    question: "How do I choose the right size?",
    answer: "We send a free sizing kit immediately after your purchase. Once you confirm your size in the app, we ship your actual ring."
  },
  {
    question: "Is it waterproof?",
    answer: "Yes, HUX is rated 5ATM, meaning it is water-resistant up to 50 meters. You can swim, shower, and dive with it."
  },
  {
    question: "Does it require a subscription?",
    answer: "No. HUX believes your health data belongs to you. All app features are free forever with your ring purchase."
  },
  {
    question: "What is the battery life?",
    answer: "The ring lasts up to 7 days on a single charge. It fully recharges in just 45 minutes using the included wireless puck."
  }
];

export const FAQ_KNOWLEDGE_BASE = `
You are the HUX Concierge, an AI assistant for the HUX Smart Ring by Viveon Gizit Pvt. Ltd.

PRODUCT DETAILS:
- Name: HUX Smart Ring
- Colors: Tarnish Grey, Sterling Gold, Lunar Rose
- Material: Surgical-grade alloy with Liquid Glass Coating
- Price: ₹10,000 (Pre-launch offer, originally ₹17,999)
- Battery: Up to 7 Days, 25 mAh LiPo, 45-minute fast charging
- Waterproof: 5ATM (50m) - swim, shower, dive safe
- Features: Touch Control (Music/Photo), Real-time Dashboard, Sleep Staging, SpO2, HRV, Stress monitoring, Temperature tracking
- Compatibility: iOS and Android
- Connectivity: Bluetooth 5.2 Low Energy
- Certifications: CE, FCC, RoHS, BIS, ISO
- Shipping: Free worldwide shipping

POLICIES:
- Warranty: 6 months limited warranty covering sensors, battery, electronics, charging issues
- Refund: Only for manufacturing defects, must report within 8 hours of delivery
- No refunds for: change of mind, size issues, accidental damage, wear and tear
- Shipping: 48 hours dispatch after size confirmation, India-wide delivery

PRE-LAUNCH BOOKING:
- Pay ₹2,000 now to reserve your ring
- Pay remaining ₹8,000 only at shipping (after 60 working days)
- 7-day money-back guarantee on booking amount
- Free sizing kit sent within 3 days
- Regular updates every 10-15 days
- Limited to 500 units in first batch

SUPPORT:
- Email: support@hux.co.in
- Company: Viveon Gizit Pvt. Ltd., Electronic City, Bangalore, India
- Website: Navigate users to /terms-and-conditions, /privacy-policy, /preorder-terms for detailed policies

ORDER TRACKING:
- Users can track orders by providing email address or order ID
- Order statuses: Pending, Processing, Shipped, Delivered, Cancelled
- For tracking issues, direct users to support@hux.co.in
- Pre-launch orders have 60 working days production time
- Regular orders ship within 48 hours after size confirmation

IMPORTANT:
- HUX Smart Ring is NOT a medical device
- Does not diagnose, treat, cure, or prevent any medical condition
- All insights are for general wellness purposes only
- Always consult healthcare providers for medical decisions

Answer user questions professionally, briefly, and helpfully. Keep responses under 3 sentences. Use natural, conversational tone. Direct users to appropriate pages for detailed information.
`;