import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://axokpoqyabndljojebns.supabase.co';
const supabaseAnonKey = 'sb_publishable_LNB58L4vwIW2Nh-zivd_sg_Q9vZ8nCr';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkDatabase() {
  const { data, error } = await supabase.from('p2p_assets').select('*').limit(5);
  if (error) {
    console.error("Database error:", error);
    return;
  }
  console.log("Assets in DB:", data);
}

checkDatabase();
