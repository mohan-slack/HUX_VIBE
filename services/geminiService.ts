import { FAQ_KNOWLEDGE_BASE } from '../constants';

// OpenAI ChatGPT configuration
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
const model = import.meta.env.VITE_OPENAI_MODEL || 'gpt-4o-mini';

export const generateResponse = async (userMessage: string, history: {role: string, parts: {text: string}[]}[]): Promise<string> => {
  try {
    if (!apiKey) {
      return "AI assistant is temporarily unavailable. Please contact support for assistance.";
    }

    const messages = [
      { role: 'system', content: FAQ_KNOWLEDGE_BASE },
      ...history.map(h => ({
        role: h.role === 'model' ? 'assistant' : h.role,
        content: h.parts.map(p => p.text).join('\n')
      })),
      { role: 'user', content: userMessage }
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.6
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API Error:', errorText);
      return "I’m having trouble connecting right now. Please try again shortly.";
    }

    const data = await response.json();
    return data?.choices?.[0]?.message?.content?.trim() || "I’m here to help, but I couldn’t generate a response.";
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return "I’m having trouble connecting to the HUX network. Please try again in a moment.";
  }
};