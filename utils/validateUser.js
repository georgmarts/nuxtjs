import mysql from 'mysql2/promise'

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
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'password',
            database: 'blog'
          });
        
        const [data] = await connection.execute(`SELECT * FROM users WHERE email = '${email}' and password = '${password}'`)
        return data
    } catch (error) {
        return { error: 'Something went wrong, please try again'}
    }
}