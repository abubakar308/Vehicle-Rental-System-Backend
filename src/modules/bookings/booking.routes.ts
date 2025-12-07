import { Router } from "express"
import { bookingController } from "./booking.controller";


const router = Router();

router.post("/", bookingController.createBooking)
// router.get("/", vehicleController.getAllVehicles);

// router.get("/:vehicleId", vehicleController.getVehicleById);

// router.put("/:vehicleId", vehicleController.updateVehicle);

// router.delete("/:vehicleId", vehicleController.deleteVehicle)


export const bookingRoute = router;