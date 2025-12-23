// Secure logging utility
const isDevelopment = (import.meta as any).env.DEV;

// Sensitive patterns to filter out
const SENSITIVE_PATTERNS = [
  /AIzaSy[A-Za-z0-9_-]{33}/g, // Google API keys
  /sk-[A-Za-z0-9]{48}/g, // OpenAI API keys
  /sb_[A-Za-z0-9_-]+/g, // Supabase keys
  /Bearer\s+[A-Za-z0-9_-]+/g, // Bearer tokens
  /password['":\s]*['"]\w+['"]/gi, // Passwords
  /token['":\s]*['"]\w+['"]/gi, // Tokens
];

// Filter sensitive data from logs
const filterSensitiveData = (message: any): string => {
  let str = typeof message === 'object' ? JSON.stringify(message) : String(message);
  
  SENSITIVE_PATTERNS.forEach(pattern => {
    str = str.replace(pattern, '[REDACTED]');
  });
  
  return str;
};

// Secure logger
export const logger = {
  info: (message: any, ...args: any[]) => {
    if (isDevelopment) {
      console.log(`[INFO] ${filterSensitiveData(message)}`, ...args.map(filterSensitiveData));
    }
  },
  
  warn: (message: any, ...args: any[]) => {
    if (isDevelopment) {
      console.warn(`[WARN] ${filterSensitiveData(message)}`, ...args.map(filterSensitiveData));
    }
  },
  
  error: (message: any, ...args: any[]) => {
    if (isDevelopment) {
      console.error(`[ERROR] ${filterSensitiveData(message)}`, ...args.map(filterSensitiveData));
    }
  },
  
  debug: (message: any, ...args: any[]) => {
    if (isDevelopment) {
      console.debug(`[DEBUG] ${filterSensitiveData(message)}`, ...args.map(filterSensitiveData));
    }
  }
};