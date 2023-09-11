import { supabase } from "~/lib/supabaseClient"
import { Post } from "~/types"
import { query } from "~/utils/mysqlQuery"

export default defineEventHandler(async (event) => {
    const body: Post = await readBody(event)
    const {error} = await supabase
    .from('posts')
    .update({ title: body.title, body: body.body, updatedAt: body.updatedAt })
    .eq('id', body.id)
    // const queryCustom = 'UPDATE posts SET title = ?, body = ?, updatedAt = ? WHERE id = ?'
    // const values = [body.title, body.body, body.updatedAt, body.id]
    // const response = await query(queryCustom, values)
    if(error?.message) return { message: 'Something went wrong' }
    return {message: 'Post is updated successfully'}
})