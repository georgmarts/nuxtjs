import { Post } from "~/types"
import { query } from "~/utils/mysqlQuery"

export default defineEventHandler(async (event) => {
    const body: Post = await readBody(event)
    const queryCustom = 'INSERT INTO posts (id, title, body, createdAt) VALUES(?, ?, ?, ?)'
    const values = [body.id, body.title, body.body, body.createdAt]
    const response = await query(queryCustom, values)
    return {
        response
    }
})