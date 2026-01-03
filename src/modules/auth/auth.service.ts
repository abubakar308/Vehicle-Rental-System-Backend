import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../../config/db";
import config from "../../config";

const registrationUser = async (payload: Record<string, unknown>) =>{
    const {name, email, password, phone, role } = payload;

    const hashedPass = await bcrypt.hash(password as unknown as string, 8);

    const result = await pool.query(`INSERT INTO users(name, email, password, phone, role) VALUES($1, $2, $3, $4, $5) RETURNING *`,
        [name, email, hashedPass, phone, role]
    );
 delete result.rows[0].password;

 return result;

};

const loginUser = async (email: string, password: string) =>{
     console.log(email);
    const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [email]);

console.log(result);
if(result.rows.length === 0){
    return null;
}

const user = result.rows[0];

const match = await bcrypt.compare(password, user.password);
if(!match){
    return false;
}

const token = jwt.sign({ name: user.name, email: user.email, role: user.role}, config.jwtSecret as string, {
    expiresIn: "7d",
} );
console.log(token);

 delete user.password;

return { token, user };

}

export const authService = {
    registrationUser,
    loginUser
}