import { pool } from "../../config/db";

const createBooking = async (payload: Record<string, unknown>) =>{
    const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

      const isAvailable = await pool.query(
    `SELECT vehicle_name, daily_rent_price, availability_status FROM vehicles WHERE id=$1`,
    [vehicle_id]
  );

  const vehicle = isAvailable.rows[0];

    if (isAvailable.rows.length === 0) {
    throw new Error("Vehicle not found");
  }

  if (vehicle.availability_status !== "available") {
    throw new Error("Vehicle is not available for booking");
  }

  const start = new Date(rent_start_date as string);
  const end = new Date(rent_end_date as string);

  const diffDays = Math.ceil(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  );
  const total_price = diffDays * vehicle.daily_rent_price;

//   3️⃣ Insert booking

  const bookingResult = await pool.query(
    `INSERT INTO bookings (
       customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status
     ) VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      total_price,
      "active",
    ]
  );



const booking = bookingResult.rows[0];

  await pool.query(
    `UPDATE vehicles SET availability_status='booked' WHERE id=$1`,
    [vehicle_id]
  );

  return {
    booking,
    vehicle: {
      vehicle_name: vehicle.vehicle_name,
      daily_rent_price: vehicle.daily_rent_price,
    },
  };

}



const getALlBookings = async () =>{
 const result = await pool.query(`SELECT id, customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status FROM bookings`);
 
 return result;
};



 const updateBooking = async(status: string, bookingId: string) =>{

    
    const result = await pool.query(`UPDATE bookings SET status=$1 WHERE id=$2 RETURNING * `,[status, bookingId]);

    const vehicle_id = result.rows[0].vehicle_id;

   const toDay = new Date();
const endDay = new Date(result.rows[0].rent_end_date);

 let finalStatus = status;

 finalStatus = result.rows[0].status;

if (toDay > endDay) {
    finalStatus = "returned";
}

   if(status==="returned"){
    const status = "available"
    pool.query(`UPDATE Vehicles SET availability_status=$1 WHERE id=$2`,[status, vehicle_id])
   }


     return result;
 };




export const bookingService = {
    createBooking,
    getALlBookings,
    updateBooking
};