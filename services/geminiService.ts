import { FAQ_KNOWLEDGE_BASE } from '../constants';
import { getOrderByEmail, getOrderById } from './orderService';
import { logger } from '../lib/logger';

// Gemini API configuration
const apiKey = (import.meta as any).env.VITE_GEMINI_API_KEY;

// Extract email or order ID from user message
const extractOrderInfo = (message: string) => {
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
  const orderIdRegex = /\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/i;
  
  const email = message.match(emailRegex)?.[0];
  const orderId = message.match(orderIdRegex)?.[0];
  
  return { email, orderId };
};

// Check if message is asking about order tracking
const isOrderTrackingQuery = (message: string) => {
  const trackingKeywords = ['track', 'order', 'status', 'delivery', 'shipping', 'where is my'];
  return trackingKeywords.some(keyword => message.toLowerCase().includes(keyword));
};

export const generateResponse = async (userMessage: string, history: {role: string, parts: {text: string}[]}[]): Promise<string> => {
  try {
    logger.debug('Gemini API request initiated');
    
    if (!apiKey) {
      logger.error('Gemini API key not found');
      return "AI assistant is temporarily unavailable. Please contact support for assistance.";
    }

    let orderInfo = '';
    
    // Check if user is asking about order tracking
    if (isOrderTrackingQuery(userMessage)) {
      const { email, orderId } = extractOrderInfo(userMessage);
      
      if (email) {
        const orders = await getOrderByEmail(email);
        if (orders.length > 0) {
          orderInfo = `\n\nORDER INFORMATION FOR ${email}:\n`;
          orders.forEach((order, index) => {
            orderInfo += `Order ${index + 1}: ID ${order.id.slice(0, 8)}... | Status: ${order.status} | Amount: ₹${order.total_amount} | Date: ${new Date(order.created_at).toLocaleDateString('en-IN')}\n`;
          });
        } else {
          orderInfo = `\n\nNo orders found for email: ${email}. Please check the email address or contact support@hux.co.in`;
        }
      } else if (orderId) {
        const order = await getOrderById(orderId);
        if (order) {
          orderInfo = `\n\nORDER DETAILS:\nID: ${order.id}\nStatus: ${order.status}\nAmount: ₹${order.total_amount}\nDate: ${new Date(order.created_at).toLocaleDateString('en-IN')}\nEmail: ${order.guest_email || 'N/A'}`;
        } else {
          orderInfo = `\n\nOrder ID ${orderId} not found. Please check the order ID or contact support@hux.co.in`;
        }
      } else {
        orderInfo = `\n\nTo track your order, please provide your email address or order ID. You can also check your email for order confirmation details.`;
      }
    }

    const requestBody = {
      contents: [
        ...history,
        {
          role: "user",
          parts: [
            { text: FAQ_KNOWLEDGE_BASE + orderInfo + "\n\nUser Question: " + userMessage }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.3,
        topK: 20,
        topP: 0.8,
        maxOutputTokens: 512,
      }
    };

    logger.debug('Making Gemini API request');
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    logger.debug(`API response status: ${response.status}`);
    if (!response.ok) {
      const errorText = await response.text();
      logger.error(`Gemini API error: ${response.status}`);
      
      if (response.status === 429) {
        return "I'm currently experiencing high demand. Please contact support@hux.co.in for immediate assistance with your HUX Smart Ring questions.";
      }
      
      return "I'm having trouble connecting right now. Please try again shortly.";
    }

    const data = await response.json();
    logger.debug('Gemini API response received successfully');
    return data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "I'm here to help, but I couldn't generate a response.";
  } catch (error) {
    logger.error('Gemini API request failed');
    return "I'm having trouble connecting to the HUX network. Please try again in a moment.";
  }
};