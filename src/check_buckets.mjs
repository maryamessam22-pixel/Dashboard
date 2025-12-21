import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zpopmstepqgeruhkvwyh.supabase.co';
const supabaseKey = 'sb_publishable_6V5HUgESvzW9PxB4MWo87w_R0Lm4VFD';
const supabase = createClient(supabaseUrl, supabaseKey);

async function listBuckets() {
    try {
        const { data, error } = await supabase.storage.listBuckets();
        if (error) {
            console.log('Error listing buckets:', error.message);
        } else {
            console.log('Buckets found:', JSON.stringify(data, null, 2));
        }
    } catch (e) {
        console.log('Exception:', e.message);
    }
}

listBuckets();
