import { pool } from "../../config/db"


const getALlUsers = async () =>{
 const result = await pool.query(`SELECT id, name, email, phone, role FROM users`);

 return result;
}

 const updateUser = async(payload: Record<string, unknown>, userId: string) =>{
    const { name, email, phone, role } = payload;
     const result = await pool.query(
    `UPDATE users SET name=$1,email=$2,phone=$3,role=$4 WHERE id=$5 RETURNING id,name,email,phone,role`,
    [name, email, phone, role, userId]
  );
  return result;
 };


     const deleteUser = async (Id: string) =>{
        console.log(Id);
        const result = await pool.query(`DELETE FROM users WHERE id = $1`, [Id]);

        // const booking = await pool.query(`SELECT status FROM Bookings WHERE customer_id=$1`,[Id]);

        // console.log(booking);
        return result;
    }


export const userServices = {
    getALlUsers,
    updateUser,
    deleteUser
}