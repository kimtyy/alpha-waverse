import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://axokpoqyabndljojebns.supabase.co';
const supabaseAnonKey = 'sb_publishable_LNB58L4vwIW2Nh-zivd_sg_Q9vZ8nCr';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkAsset(id: string) {
  console.log(`Checking asset: ${id}`);
  const { data, error } = await supabase.storage.from('assets').list('', {
    search: id
  });
  
  if (error) {
    console.error("Storage list error:", error);
    return;
  }
  
  console.log("Found files:", data);
  if (data && data.length > 0) {
    console.log(`SUCCESS: File ${id} exists in 'assets' bucket.`);
  } else {
    console.log(`FAILURE: File ${id} NOT FOUND in 'assets' bucket.`);
  }
}

// Check the ISRC from the screenshot
checkAsset('user-asset-171'); // Likely prefix
checkAsset('1'); // Test ID
