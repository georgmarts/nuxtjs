import { Post } from "~/types"
import { query } from "~/utils/mysqlQuery"

export default defineEventHandler(async (event) => {
    const body: Post = await readBody(event)
    const queryCustom = 'UPDATE posts SET title = ?, body = ?, updatedAt = ? WHERE id = ?'
    const values = [body.title, body.body, body.updatedAt, body.id]
    const response = await query(queryCustom, values)
    return {
        response
    }
})