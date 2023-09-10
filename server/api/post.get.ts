import { supabase } from "~/lib/supabaseClient"
import { query } from "~/utils/mysqlQuery"

export default defineEventHandler(async (event) => {
    const queryParam = getQuery(event)
    const { data } = await supabase.from('posts').select().eq('id', queryParam.id)
    // const queryParam = getQuery(event)
    // const queryCustom = 'SELECT * FROM posts WHERE id = ?'
    // const values = [queryParam.id]
    // const data = await query(queryCustom, values)
    return {
        data
    }
})