// Security configuration and environment variable protection
const isDevelopment = import.meta.env.DEV;

// Secure environment variable access
export const getSecureConfig = () => {
  const config = {
    supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
    supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
    openAiApiKey: import.meta.env.VITE_OPENAI_API_KEY,
  };

  // Validate required environment variables
  if (!config.supabaseUrl || !config.supabaseAnonKey) {
    throw new Error('Missing required environment variables');
  }

  return config;
};

// Disable console in production
if (!isDevelopment) {
  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
  console.info = () => {};
  console.debug = () => {};
}