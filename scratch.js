import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zpopmstepqgeruhkvwyh.supabase.co';
const supabaseKey = 'sb_publishable_6V5HUgESvzW9PxB4MWo87w_R0Lm4VFD';
const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
    const { error } = await supabase
        .from('Projects')
        .update({ Thumbnail: 'https://zpopmstepqgeruhkvwyh.supabase.co/storage/v1/object/public/portfolio-assets/0.46306744237574393.jpeg' })
        .ilike('project_name_EN', '%Qlink%');
    console.log(error);
}
main();
