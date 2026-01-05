import { Request, Response } from "express";
import { bookingService } from "./booking.service";

const createBooking = async(req: Request, res: Response) =>{
    try{
        const result = await bookingService.createBooking(req.body);

     return res.status(201).json({
        success: true,
        message: "Booking created successfully",
        data: result
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
        const user =req.user!;
        const result = await bookingService.getALlBookings(user);
        
       return res.status(200).json({
      success: true,
      message:
        user.role === "admin"
          ? "Bookings retrieved successfully"
          : "Your bookings retrieved successfully",
      data: result
    });

    } catch(err: any){
        return res.status(500).json({
            success: false,
            messasge: err.messasge

        })
    }
};



const updateBooking = async (req: Request, res: Response) =>{
const {status} = req.body;
const user =req.user;

try{
const result = await bookingService.updateBooking(status, user, req.params.bookingId!);
if(result.length === 0){
   return res.status(404).json({
        success: false,
     message: "Booking not found"
    })
}
console.log(result);
  return res.status(200).json({
      success: true,
      message:
        status === "cancelled"
          ? "Booking cancelled successfully"
          : "Booking marked as returned. Vehicle is now available",
      data: result
    });
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