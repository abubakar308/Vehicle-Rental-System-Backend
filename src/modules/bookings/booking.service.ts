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

//  Insert booking

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



const getALlBookings = async (user: any) =>{

 if (user.role === "admin") {
    const result = await pool.query(`
      SELECT b.*, 
        u.name AS customer_name, u.email AS customer_email,
        v.vehicle_name, v.registration_number
      FROM bookings b
      JOIN users u ON b.customer_id = u.id
      JOIN vehicles v ON b.vehicle_id = v.id
    `);

    return result.rows.map((item) => ({
      id: item.id,
      customer_id: item.customer_id,
      vehicle_id: item.vehicle_id,
      rent_start_date: item.rent_start_date,
      rent_end_date: item.rent_end_date,
      total_price: item.total_price,
      status: item.status,
      customer: {
        name: item.customer_name,
        email: item.customer_email,
      },
      vehicle: {
        vehicle_name: item.vehicle_name,
        registration_number: item.registration_number,
      },
    }));
  }


  // Customer view
  const result = await pool.query(
    `
    SELECT b.*, v.vehicle_name, v.registration_number, v.type
    FROM bookings b
    JOIN vehicles v ON b.vehicle_id = v.id
    WHERE b.customer_id = $1
    `,
    [user.id]
  );

// console.log(result);
  return result.rows.map((item) => ({
    id: item.id,
    vehicle_id: item.vehicle_id,
    rent_start_date: item.rent_start_date,
    rent_end_date: item.rent_end_date,
    total_price: item.total_price,
    status: item.status,
    vehicle: {
      vehicle_name: item.vehicle_name,
      registration_number: item.registration_number,
      type: item.type,
    },
  }));
    

};



 const updateBooking = async(status: string, user:any, bookingId: string) =>{

  if (user.role === "customer") {
    const startDate = await pool.query(
      `SELECT rent_start_date FROM bookings WHERE id=$1`,
      [bookingId]
    );
    const booking = startDate.rows[0];
    const today = new Date();
    const rentStartDate = new Date(booking.rent_start_date);
      if (today >= rentStartDate) {
      throw new Error("Cannot update booking after rental has started");
    }
      const result = await pool.query(
        `UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *`,
        [status, bookingId]
      );
      return result;
    }


  // Admin marks as returned
  if (user.role === "admin") {
    const updateStatus = await pool.query(
      `UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *`,
      [status, bookingId]
    );
    const bookingsInfo = updateStatus.rows[0];
    const vehicleId = updateStatus.rows[0].vehicle_id;

    const result = await pool.query(
      `UPDATE vehicles SET availability_status=$1 WHERE id= $2
      RETURNING availability_status`,
      ["available", vehicleId]
    );
    const vehicleAvailable = result.rows[0].availability_status;
   
    return {
      ...bookingsInfo,
      vehicle: {
        availability_status: vehicleAvailable,
      },
    };
  }

}


export const bookingService = {
    createBooking,
    getALlBookings,
    updateBooking
};