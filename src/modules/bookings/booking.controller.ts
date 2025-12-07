import { Request, Response } from "express";
import { bookingService } from "./booking.service";

const createBooking = async(req: Request, res: Response) =>{
      console.log(req.body);
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
}

export const bookingController = {
    createBooking
}