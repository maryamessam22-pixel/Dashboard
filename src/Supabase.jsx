import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://zpopmstepqgeruhkvwyh.supabase.co'
const supabaseKey = 'sb_publishable_6V5HUgESvzW9PxB4MWo87w_R0Lm4VFD'
export const supabase = createClient(supabaseUrl, supabaseKey)
