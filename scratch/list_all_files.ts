import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://axokpoqyabndljojebns.supabase.co';
const supabaseAnonKey = 'sb_publishable_LNB58L4vwIW2Nh-zivd_sg_Q9vZ8nCr';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function listAllFiles() {
  console.log("Listing ALL files in 'assets' bucket...");
  const { data, error } = await supabase.storage.from('assets').list('', {
    limit: 100,
    offset: 0,
    sortBy: { column: 'name', order: 'desc' }
  });
  
  if (error) {
    console.error("Storage list error:", error);
    return;
  }
  
  console.log("Found files count:", data.length);
  data.forEach(file => {
    console.log(`- ${file.name} (size: ${file.metadata?.size}, type: ${file.metadata?.mimetype})`);
  });
}

listAllFiles();
