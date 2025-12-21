import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zpopmstepqgeruhkvwyh.supabase.co';
const supabaseKey = 'sb_publishable_6V5HUgESvzW9PxB4MWo87w_R0Lm4VFD';
const supabase = createClient(supabaseUrl, supabaseKey);

async function createImagesBucket() {
    try {
        const { data, error } = await supabase.storage.createBucket('images', {
            public: true,
            allowedMimeTypes: ['image/*'],
            fileSizeLimit: 5242880 // 5MB
        });

        if (error) {
            console.log('Error creating bucket:', error.message);
        } else {
            console.log('Bucket "images" created successfully:', data);
        }
    } catch (e) {
        console.log('Exception:', e.message);
    }
}

createImagesBucket();
