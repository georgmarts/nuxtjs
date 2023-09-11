import mysql from 'mysql2/promise'
import { supabase } from '~/lib/supabaseClient';

// type User = {
//     id: number,
//     firstName: string,
//     lastName: string,
//     email: string,
//     phoneNumber: string
// }

// type Error = {
//     error: string
// }


export async function validateUser(email, password) {
        const data = supabase.from('users').select().eq('email', email).eq('password', password)
        return data

    // try {
    //     const connection = await mysql.createConnection({
    //         host: 'localhost',
    //         user: 'root',
    //         password: 'password',
    //         database: 'blog'
    //       });
        
    //     const [data] = await connection.execute(`SELECT * FROM users WHERE email = '${email}' and password = '${password}'`)
    //     return data
    // } catch (error) {
    //     return { error: 'Something went wrong, please try again'}
    // }
}