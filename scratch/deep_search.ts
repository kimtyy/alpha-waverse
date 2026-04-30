import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://axokpoqyabndljojebns.supabase.co';
const supabaseAnonKey = 'sb_publishable_LNB58L4vwIW2Nh-zivd_sg_Q9vZ8nCr';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function findMyFiles() {
  const { data: buckets, error: bError } = await supabase.storage.listBuckets();
  if (bError) {
    console.error("Bucket list error:", bError);
    return;
  }
  
  console.log("Buckets found:", buckets.map(b => b.name));
  
  for (const bucket of buckets) {
    console.log(`Searching in bucket: ${bucket.name}...`);
    const { data: files, error: fError } = await supabase.storage.from(bucket.name).list();
    if (fError) {
      console.error(`Error listing ${bucket.name}:`, fError);
      continue;
    }
    console.log(`- Found ${files.length} files in '${bucket.name}'`);
    files.forEach(f => console.log(`  > ${f.name}`));
  }
}

findMyFiles();
