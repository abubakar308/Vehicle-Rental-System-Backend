import { Router } from "express";
import { vehicleController } from "./vehicle.controller";



const router = Router();

router.post("/", vehicleController.crteateVehicle);

router.get("/", vehicleController.getAllVehicles);

router.get("/:vehicleId", vehicleController.getVehicleById);

router.put("/:vehicleId", vehicleController.updateVehicle);

router.delete("/:vehicleId", vehicleController.deleteVehicle)


export const vehicleRoute = router;