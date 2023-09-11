import { supabase } from "~/lib/supabaseClient"
import { MySQLResponse, User } from "~/types"
import { query } from "~/utils/mysqlQuery"

export default defineEventHandler(async (event) => {
    const body: User = await readBody(event)
    const {status, statusText} = await supabase
    .from('users')
    .update({ firstName: body.firstName, lastName: body.lastName, phoneNumber: body.phoneNumber, password: body.password })
    .eq('id', body.id)
    // const queryCustom = 'UPDATE users SET firstName = ?, lastName = ?, phoneNumber = ?, password = ? WHERE id = ?'
    // const values = [body.firstName, body.lastName, body.phoneNumber, body.password, body.id]
    // const response = await query(queryCustom, values) as MySQLResponse
    return {
        statusText
    }
})