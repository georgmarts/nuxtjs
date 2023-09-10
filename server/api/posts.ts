import { supabase } from "../../lib/supabaseClient"

export default defineEventHandler(async (event) => {
    const { data } = await supabase.from('posts').select()
    return {
        data
    }
})
