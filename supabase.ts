import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://your-project.supabase.co';        // ← Change this
const supabaseAnonKey = 'your-anon-key';                       // ← Change this

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
