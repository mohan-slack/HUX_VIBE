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
You are the HUX Concierge, an AI assistant for the HUX Smart Ring.
Product Details:
- Name: HUX Smart Ring
- Colors: Tarnish Grey, Sterling Gold, Lunar Rose.
- Material: Titanium Alloy with Liquid Glass Coating.
- Price: ₹12,999 (Discounted from ₹22,999). Approx $299 USD.
- Battery: Up to 7 Days. 25 mAh LiPo.
- Waterproof: 5ATM (50m).
- Features: Touch Control (Music/Photo), Real-time Dashboard, Sleep Staging, SpO2, HRV.
- Compatibility: iOS and Android.
- Connectivity: Bluetooth 5.2.
- Certifications: CE, FCC, RoHS.
- Shipping: Free worldwide shipping.
- Brand Tone: Premium, Intelligent, Helpful, Sophisticated.

Answer user questions briefly and professionally.
`;