import { supabase } from "~/lib/supabaseClient"
import { query } from "~/utils/mysqlQuery"

export default defineEventHandler(async (event) => {
    const queryParam = getQuery(event)
    const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', queryParam.id)
    // const queryCustom = 'DELETE FROM posts WHERE id = ?'
    // const values = [queryParam.id]
    // const response = await query(queryCustom, values)
    if(error?.message) return { message: 'Something went wrong' }
    return {message: 'Post is deleted successfully'}
})