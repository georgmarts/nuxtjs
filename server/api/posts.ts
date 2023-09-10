import { supabase } from "../../lib/supabaseClient"
import { query } from "~/utils/mysqlQuery"

export default defineEventHandler(async (event) => {
    const { data } = await supabase.from('posts').select().order('id', { ascending: true })
    // const queryCustom = 'SELECT * FROM posts'
    // const values: never[] = []
    // const data = await query(queryCustom, values)
    // const x = true
    // if (!x) {
    //     throw createError({
    //       statusCode: 400,
    //       statusMessage: 'ID should be an integer',
    //     })
    // }
    return {
        data,
    }
})