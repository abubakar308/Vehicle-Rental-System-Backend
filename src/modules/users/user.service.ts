import { pool } from "../../config/db"


const getALlUsers = async () =>{
 const result = await pool.query(`SELECT id, name, email, phone, role FROM users`);

 return result;
}

 const updateUser = async(userId: string) =>{
    const result = await pool.query(`SELECT id, name, email, phone, role FROM users WHERE id=$1`,[userId]);
     return result;
 };


     const deleteUser = async (userId: string) =>{
        console.log(userId);
        const result = await pool.query(`DELETE FROM users WHERE id = $1`, [userId]);

        console.log(userId);

        const booking = await pool.query(`SELECT status FROM Bookings WHERE customer_id=$1`,[userId]);

        console.log(booking);
        // return result;
    }


export const userServices = {
    getALlUsers,
    updateUser,
    deleteUser
}