import { supabase } from "~/lib/supabaseClient"
import { query } from "~/utils/mysqlQuery"

export default defineEventHandler(async (event) => {
    const queryParam = getQuery(event)
    const {status, statusText} = await supabase
    .from('users')
    .delete()
    .eq('id', queryParam.id)
    // const queryCustom = 'DELETE FROM users WHERE id = ?'
    // const values = [queryParam.id]
    // const response = await query(queryCustom, values)
    return {
        statusText
    }
})