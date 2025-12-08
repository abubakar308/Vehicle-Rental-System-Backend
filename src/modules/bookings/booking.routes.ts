import { Router } from "express"
import { bookingController } from "./booking.controller";


const router = Router();

router.post("/", bookingController.createBooking)
router.get("/", bookingController.getALlBookings);

// router.get("/:vehicleId", vehicleController.getVehicleById);

router.put("/:bookingId", bookingController.updateBooking);

// router.delete("/:vehicleId", vehicleController.deleteVehicle)


export const bookingRoute = router;