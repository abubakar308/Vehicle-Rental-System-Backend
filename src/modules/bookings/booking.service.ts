import { pool } from "../../config/db";

const createBooking = async (payload: Record<string, unknown>) =>{
    const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

    const vehicleData= await pool.query(`SELECT vehicle_name, daily_rent_price FROM Vehicles WHERE id=$1`, [vehicle_id]);

    const vehiclePrice = vehicleData.rows[0].daily_rent_price;

    const start  = new Date(rent_start_date as string);
    const end = new Date(rent_end_date as string);

// difference in ms → convert to days
const days = (end.getDate() - start.getDate()) / (1000 * 60 * 60 * 24);
const total_price = vehiclePrice * days;

    
const status = "active";

const result = await pool.query(`INSERT INTO Bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`, [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status]);

if(result){
    pool.query(`UPDATE Vehicles SET availability_status = 'booked' WHERE id = $1`,[vehicle_id]);
};

const vehicleRes = await pool.query(
  `SELECT vehicle_name, daily_rent_price vehicleRes
   FROM Vehicles 
   WHERE id=$1`,
  [vehicle_id]
);


return { 
  ...result, vehicle: vehicleRes
}


}




export const bookingService = {
    createBooking,
};