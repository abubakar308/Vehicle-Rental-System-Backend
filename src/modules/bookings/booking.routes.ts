import { Router } from "express"
import { bookingController } from "./booking.controller";
import verify from "../../middleware/verify";
import auth from "../../middleware/auth";


const router = Router();

router.post("/",verify, auth(),  bookingController.createBooking);

router.get("/", verify, auth(), bookingController.getALlBookings);

router.put("/:bookingId", verify, auth(), bookingController.updateBooking);


export const bookingRoute = router;