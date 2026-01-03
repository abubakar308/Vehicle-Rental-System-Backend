import { pool } from "../../config/db"

const crteateVehicle = async(payload: Record<string, unknown>) =>{
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = payload;

      if (
    !vehicle_name ||
    !type ||
    !registration_number ||
    !daily_rent_price ||
    !availability_status
  ) {
    throw new Error("All fields are required");
  }


    const exists = await pool.query(
    "SELECT * FROM vehicles WHERE registration_number = $1",
    [registration_number]
  );

  if (exists.rows.length > 0) {
    throw new Error("Registration number already exists");
  }


    const result = await pool.query(`INSERT INTO Vehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES($1, $2, $3, $4, $5) RETURNING *`, [vehicle_name, type, registration_number, daily_rent_price, availability_status]);

return result;

};



//get all vehicles
const getAllVehicles = async() =>{
    const result = await pool.query(`SELECT * FROM Vehicles`);
    return result;
}

   const getVehicleById = async(Id: string) =>{
 const result = await pool.query(`SELECT * FROM Vehicles WHERE Id = $1`, [Id]);
 return result
    }



       const updateVehicle = async (vehicle_name: string, type: string, registration_number: string, daily_rent_price: number, availability_status: string, vehicleId: string) =>{
        const result = await pool.query(`UPDATE Vehicles SET vehicle_name=$1, type=$2, registration_number=$3, daily_rent_price=$4, availability_status=$5 WHERE id=$6 RETURNING *`,
            [vehicle_name, type, registration_number, daily_rent_price, availability_status, vehicleId]
        )
        return result;
    }

    const deleteVehicel = async (vehicleId: string) =>{
        const result = await pool.query(`DELETE FROM Vehicles WHERE id = $1`, [vehicleId]);
        return result;
    }



export const vehicleServices = {
    crteateVehicle,
    getAllVehicles,
    getVehicleById,
    updateVehicle,
    deleteVehicel
}