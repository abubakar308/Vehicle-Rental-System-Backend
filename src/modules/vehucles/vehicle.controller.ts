import { Request, Response } from "express";
import { vehicleServices } from "./vehicle.service";


const crteateVehicle = async(req: Request, res: Response) =>{

    try{
         const result = await vehicleServices.crteateVehicle(req.body);

    return res.status(201).json({
        success: true,
        message: "Vehicle created successfully",
        data: result.rows[0]
    })

    } catch(err: any){
    return res.status(500).json({
  success: false,
  message: err.message,
  errors: err
        })
    }
}


const getAllVehicles = async(req: Request, res: Response) =>{

    try{ 
        const result = await vehicleServices.getAllVehicles();

           return res.status(200).json({
        success: true,
        message: "Vehicle retrieved successfully",
        data: result.rows
    })

    } catch(err: any){
     return res.status(500).json({
  success: false,
  message: err.message,
  errors: err
        })
    }
}


const getVehicleById = async(req: Request, res: Response) =>{

 try{
       const result = await vehicleServices.getVehicleById(req.params.vehicleId!);

       if((result).rows.length === 0){
          res.status(500).json({
        success: false,
     message: "vehicle not found"
    }); 
 }else{
    res.status(200).json({
        success: true,
        message: "Vehicle retrieved successfully",
        data: result.rows[0]
    })
}
    } catch(err: any){
     return res.status(500).json({
  success: false,
  message: err.message,
  errors: err
        })
    }
 }



 const updateVehicle = async (req: Request, res: Response) =>{

    const {vehicle_name, type, registration_number, daily_rent_price, availability_status} = req.body;
    try{
const result = await vehicleServices.updateVehicle(vehicle_name, type, registration_number, daily_rent_price, availability_status, req.params.vehicleId!);

if((result).rows.length === 0){
    res.status(404).json({
        success: false,
     message: "vehicle not found"
    })
}else{
    res.status(200).json({
        success: true,
        message: "vehicle updated successfully",
        data: result.rows[0]
    })
}
    }catch(err: any){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


const deleteVehicle = async(req: Request, res: Response) =>{
    try{
        const result = await vehicleServices.deleteVehicel(req.params.vehicleId!)

        if(result.rowCount == 0) {
            res.status(404).json({
                success: false,
                message: " vehicle not found"
            }) 
        } else{
            res.status(200).json({
                success: true,
                message: "vehicle deleted successfully",
            })
        }

    }catch(err: any){
        res.status(500).json({
            success: false,
            message: err.message
        })

    }
}




export const vehicleController = {
    crteateVehicle,
    getAllVehicles,
    getVehicleById,
    updateVehicle,
    deleteVehicle
}