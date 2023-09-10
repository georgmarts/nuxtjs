import mysql from 'mysql2/promise'
import { supabase } from '~/lib/supabaseClient';


export async function validateUser(email, password) {
    try {
        const data = supabase.from('users').select().eq('email', email).eq('password', password)
        // console.log(data)
        return data
    } catch (error) {
        console.log("Server error")
    }
}
