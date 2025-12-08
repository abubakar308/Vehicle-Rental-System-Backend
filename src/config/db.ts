import {Pool } from "pg";
import config from ".";


export const pool = new Pool({
    connectionString: `${config.connection_str}`
});

const initDb = async()=> {
    //Users table crate
    await pool.query(`CREATE TABLE IF NOT EXISTS Users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
       CONSTRAINT minlength CHECK (LENGTH(password) >= 6),
        phone BIGINT NOT NULL,
        role VARCHAR(50) NOT NULL
        )` 
    );

         await pool.query(`CREATE TABLE IF NOT EXISTS Vehicles(
        id SERIAL PRIMARY KEY,
        vehicle_name VARCHAR(100) NOT NULL,
        type VARCHAR(50),
        registration_number VARCHAR(150) NOT NULL UNIQUE,
        daily_rent_price INT NOT NULL,
        availability_status VARCHAR(50)
        )`
    );


        //Bookings table create
         await pool.query(`CREATE TABLE IF NOT EXISTS Bookings(
        id SERIAL PRIMARY KEY,
        customer_id INT REFERENCES Users(id) ON DELETE CASCADE,
        vehicle_id INT REFERENCES Vehicles(id) ON DELETE CASCADE,
        rent_start_date	DATE,
        rent_end_date DATE,
        total_price INT NOT NULL,
        status VARCHAR(50)
        )`
    );
};




export default initDb;