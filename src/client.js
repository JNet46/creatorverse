// src/client.js

import { createClient } from '@supabase/supabase-js'

// --- DEBUGGING ---
console.log("VITE_SUPABASE_URL:", import.meta.env.VITE_SUPABASE_URL);
console.log("VITE_SUPABASE_ANON_KEY:", import.meta.env.VITE_SUPABASE_ANON_KEY);
// --- END DEBUGGING ---

const URL = import.meta.env.VITE_SUPABASE_URL
const API_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(URL, API_KEY)