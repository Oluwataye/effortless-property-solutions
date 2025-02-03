import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bbzawuisboqzcdjmcvgl.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseKey) {
  console.error('Missing Supabase Anon Key. Please check your environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);