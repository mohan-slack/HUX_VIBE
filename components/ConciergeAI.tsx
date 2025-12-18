import React, { useState, useRef, useEffect } from 'react';
import { X, Send } from 'lucide-react';
import { generateResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

const GoldRingIcon = ({ className, size = 24 }: { className?: string; size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
  >
    <defs>
      <linearGradient id="goldGradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FDE68A" />
        <stop offset="25%" stopColor="#D4AF37" />
        <stop offset="50%" stopColor="#F59E0B" />
        <stop offset="75%" stopColor="#D4AF37" />
        <stop offset="100%" stopColor="#FDE68A" />
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="1" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    {/* Ring Body */}
    <circle 
      cx="12" 
      cy="12" 
      r="7" 
      stroke="url(#goldGradient)" 
      strokeWidth="3.5" 
      filter="url(#glow)"
    />
    {/* Inner Shadow/Depth */}
    <circle 
      cx="12" 
      cy="12" 
      r="7" 
      stroke="rgba(0,0,0,0.1)" 
      strokeWidth="1" 
    />
    {/* Sensor Bump Details */}
    <path 
      d="M12 17.5C12.8 17.5 13.5 17 13.5 17" 
      stroke="url(#goldGradient)" 
      strokeWidth="2" 
      strokeLinecap="round" 
    />
  </svg>
);

export const ConciergeAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Welcome to HUX. I am your personal AI assistant. How can I help you today?', timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const responseText = await generateResponse(userMsg.text, history);
      
      const modelMsg: ChatMessage = { role: 'model', text: responseText, timestamp: Date.now() };
      setMessages(prev => [...prev, modelMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-24 right-8 z-50 bg-white border border-hux-gold/30 p-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transition-all group ${isOpen ? 'hidden' : 'flex'} items-center justify-center`}
      >
        <GoldRingIcon size={28} />
        <span className="absolute right-full mr-4 bg-hux-dark text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
          HUX AI
        </span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-8 z-50 w-full max-w-[360px] h-[550px] glass rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-slideUp ring-1 ring-white/50">
          {/* Header */}
          <div className="p-4 border-b border-white/50 flex justify-between items-center bg-white/40">
            <div className="flex items-center gap-3">
              <div className="bg-white/80 p-1.5 rounded-lg border border-neutral-100 shadow-sm">
                <GoldRingIcon size={18} />
              </div>
              <h3 className="font-display font-bold text-hux-dark text-sm">HUX AI</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-neutral-400 hover:text-hux-dark transition-colors">
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white/20">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-gradient-to-r from-hux-turquoise to-hux-turquoiseLight text-white rounded-br-none' 
                      : 'bg-white text-neutral-700 rounded-bl-none border border-white/60'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl rounded-bl-none px-4 py-3 border border-white/60 shadow-sm">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-neutral-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-neutral-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-neutral-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/50 bg-white/60">
            <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 border border-white shadow-sm focus-within:border-hux-turquoise focus-within:ring-2 focus-within:ring-hux-turquoise/20 transition-all">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about sizing, health tracking..."
                className="bg-transparent flex-1 text-sm text-hux-dark focus:outline-none placeholder:text-neutral-400"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim()}
                className="text-hux-turquoise disabled:opacity-50 hover:scale-110 transition-transform"
              >
                <Send size={18} />
              </button>
            </div>
            <div className="text-center mt-2">
              <p className="text-[10px] text-neutral-400">Powered by Google Gemini</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};