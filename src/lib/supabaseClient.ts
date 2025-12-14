import { createClient } from '@supabase/supabase-js'
import { getSecureConfig } from '../../security';

const config = getSecureConfig();

export const supabase = createClient(config.supabaseUrl, config.supabaseAnonKey);
