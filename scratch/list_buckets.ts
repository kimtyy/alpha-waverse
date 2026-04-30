import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://axokpoqyabndljojebns.supabase.co';
const supabaseAnonKey = 'sb_publishable_LNB58L4vwIW2Nh-zivd_sg_Q9vZ8nCr';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function listBuckets() {
  const { data, error } = await supabase.storage.listBuckets();
  if (error) {
    console.error("List buckets error:", error);
    return;
  }
  console.log("Buckets:", data);
}

listBuckets();
