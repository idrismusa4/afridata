// This file initializes the Supabase client.

import { createClient } from '@supabase/supabase-js';

// Ensure these environment variables are set in your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL and Anon Key are required.');
  // In a real application, you might want to handle this more gracefully
  // than just exiting or throwing an error on import.
  throw new Error('Missing Supabase environment variables.');
}

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);

console.log('Supabase client initialized.'); 