import { MySQLResponse, User } from "~/types"
import { query } from "~/utils/mysqlQuery"

export default defineEventHandler(async (event) => {
    const body: User = await readBody(event)
    const queryCustom = 'UPDATE users SET firstName = ?, lastName = ?, phoneNumber = ?, password = ? WHERE id = ?'
    const values = [body.firstName, body.lastName, body.phoneNumber, body.password, body.id]
    const response = await query(queryCustom, values) as MySQLResponse
    console.log(response)
    return {
        response
    }
})