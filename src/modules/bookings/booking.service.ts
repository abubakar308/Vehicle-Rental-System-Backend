import { pool } from "../../config/db";

const createBooking = async (payload: Record<string, unknown>) =>{
    const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

    const vehicleData= await pool.query(`SELECT vehicle_name, daily_rent_price FROM Vehicles WHERE id=$1`, [vehicle_id]);

    const vehiclePrice = vehicleData.rows[0].daily_rent_price;

    const start  = new Date(rent_start_date as any);
    const end = new Date(rent_end_date as any);

const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

const total_price = Math.ceil(vehiclePrice * days);


    
const status = "active";

const result = await pool.query(`INSERT INTO Bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`, [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status]);

if(result){
    pool.query(`UPDATE Vehicles SET availability_status = 'booked' WHERE id = $1`,[vehicle_id]);
};

const vehicleRes = await pool.query(
  `SELECT vehicle_name, daily_rent_price, availability_status
   FROM Vehicles 
   WHERE id=$1`,
  [vehicle_id]
);

console.log(vehicleRes);

return result;


}



const getALlBookings = async () =>{
 const result = await pool.query(`SELECT id, customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status FROM bookings`);
 
 return result;
};



 const updateBooking = async(status: string, bookingId: string) =>{

    const rent_end_date = new Date();
    const result = await pool.query(`UPDATE bookings SET status=$1 WHERE id=$2 RETURNING * `,[status, bookingId]);

    const vehicle_id = result.rows[0].vehicle_id;

   if(rent_end_date > result.rows[0].rent_end_date){
    status = "returned"
   }

   if(status==="returned"){
    pool.query(`UPDATE Vehicles SET availability_status="available" WHERE id=$1`,[vehicle_id])
   }

     return result;
 };




export const bookingService = {
    createBooking,
    getALlBookings,
    updateBooking
};