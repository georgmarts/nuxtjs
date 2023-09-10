import { MySQLResponse, User } from "~/types"
import { query } from "~/utils/mysqlQuery"

export default defineEventHandler(async (event) => {
    const body: User = await readBody(event)
    const queryCustom = 'INSERT INTO users VALUES(?, ?, ?, ?, ?, ?)'
    const values = [body.id, body.firstName, body.lastName, body.email, body.phoneNumber, body.password]
    const response = await query(queryCustom, values) as MySQLResponse
    if(response.error?.code === 'ER_DUP_ENTRY') {
        throw createError({
            statusCode: 400,
            statusMessage: 'Email already exists',
          })
    }
    return {
        response
    }
})