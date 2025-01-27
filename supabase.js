import { createClient } from '@supabase/supabase-js';
// import { BASE_URL, ANON_KEY } from ".env";

// 從 API 頁面複製你的 Base URL 和 anon key
const supabaseUrl =
    import.meta.env.VITE_BASE_URL;
// const supabaseUrl = BASE_URL;
const supabaseKey =
    import.meta.env.VITE_ANON_KEY;
// const supabaseKey = ANON_KEY;

if (!supabaseUrl) {
    throw new Error('Supabase URL  is missing. Check your .env file.');

}
if (!supabaseKey) {
    throw new Error(' Key is missing. Check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);