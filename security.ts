// Security configuration and environment variable protection
const isDevelopment = (import.meta as any).env.DEV;

// Secure environment variable access
export const getSecureConfig = () => {
  const config = {
    supabaseUrl: (import.meta as any).env.VITE_SUPABASE_URL,
    supabaseAnonKey: (import.meta as any).env.VITE_SUPABASE_ANON_KEY,
    geminiApiKey: (import.meta as any).env.VITE_GEMINI_API_KEY,
  };

  // Validate required environment variables
  if (!config.supabaseUrl || !config.supabaseAnonKey) {
    throw new Error('Missing required environment variables');
  }

  return config;
};

// Disable all console output in production - but allow secure logger
if (!isDevelopment) {
  const noop = () => {};
  // Only disable direct console usage, not our secure logger
  window.console.log = noop;
  window.console.warn = noop;
  window.console.error = noop;
  window.console.info = noop;
  window.console.debug = noop;
  window.console.trace = noop;
  window.console.table = noop;
}