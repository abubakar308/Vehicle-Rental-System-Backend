import { Request, Response } from "express";
import { bookingService } from "./booking.service";

const createBooking = async(req: Request, res: Response) =>{
    try{
        const result = await bookingService.createBooking(req.body);

     return res.status(201).json({
        success: true,
        message: "Booking created successfully",
        data: result.rows[0]
    })

    } catch(err: any){
         return res.status(500).json({
  success: false,
  message: err.message,
  errors: err
        })
    }
};


const getALlBookings = async(req: Request, res: Response) =>{

    try{
        const result = await bookingService.getALlBookings();
console.log(result.rows[0]);
        
         if(req.user.role === "admin"){
             return res.status(200).json({
            success: true,
            message: "Bookings retrieved successfully",
            data: result.rows
        })
         }

         else if(req.user.role === "customer"){
            return res.status(200).json({
            success: true,
            message: "Bookings retrieved successfully",
            data: result.rows[0]
        })
         }

    } catch(err: any){
        return res.status(500).json({
            success: false,
            messasge: err.messasge

        })
    }
};



const updateBooking = async (req: Request, res: Response) =>{
const {status} = req.body;

try{
const result = await bookingService.updateBooking(status, req.params.bookingId!);

if((result).rows.length === 0){
   return res.status(404).json({
        success: false,
     message: "Booking not found"
    })
}else if(req.user.role === "admin" && result.rows[0].status === "returned"){
   return res.status(200).json({
        success: true,
        message: "Booking marked as returned. Vehicle is now available",
        data: result.rows[0]
    })
}
else if(req.user.role === "customer" && result.rows[0].status === "canceled"){
   return res.status(200).json({
        success: true,
        message: "Booking cancelled successfully",
        data: result.rows[0]
    })
}

} catch(err:any){
       return res.status(500).json({
            successs: false,
            message: err.message
        })
}
}

export const bookingController = {
    createBooking,
    getALlBookings,
    updateBooking
}