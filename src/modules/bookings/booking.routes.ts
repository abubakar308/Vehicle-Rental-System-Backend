import { Router } from "express"
import { bookingController } from "./booking.controller";
import verify from "../../middleware/verify";
import auth from "../../middleware/auth";


const router = Router();

router.post("/",verify, auth('admin', 'customer'),  bookingController.createBooking);

router.get("/", verify, auth('admin', 'customer'), bookingController.getALlBookings);

router.put("/:bookingId", verify, auth(), bookingController.updateBooking);


export const bookingRoute = router;