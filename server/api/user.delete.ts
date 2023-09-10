import { query } from "~/utils/mysqlQuery"

export default defineEventHandler(async (event) => {
    const queryParam = getQuery(event)
    const queryCustom = 'DELETE FROM users WHERE id = ?'
    const values = [queryParam.id]
    const response = await query(queryCustom, values)
    return {
        response
    }
})