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
          return res.status(200).json({
            success: true,
            message: "Bookings retrieved successfully",
            data: result.rows
        })

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
    res.status(404).json({
        success: false,
     message: "Booking not found"
    })
}else{
    res.status(200).json({
        success: true,
        message: "Booking updated successfully",
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