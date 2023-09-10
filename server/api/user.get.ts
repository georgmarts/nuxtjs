import { query } from "~/utils/mysqlQuery"

export default defineEventHandler(async (event) => {
    const queryParam = getQuery(event)
    const queryCustom = 'SELECT * FROM users WHERE id = ?'
    const values = [queryParam.id]
    const data = await query(queryCustom, values)
    return {
        data
    }
})