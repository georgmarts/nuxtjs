import { query } from "~/utils/mysqlQuery"

export default defineEventHandler(async (event) => {
    const queryCustom = 'SELECT * FROM posts'
    const values: never[] = []
    const data = await query(queryCustom, values)
    const x = true
    if (!x) {
        throw createError({
          statusCode: 400,
          statusMessage: 'ID should be an integer',
        })
    }
    return {
        data,
    }
})