import { Router } from "express";
import { vehicleController } from "./vehicle.controller";
import verify from "../../middleware/verify";
import auth from "../../middleware/auth";



const router = Router();

router.post("/", verify, auth("admin"), vehicleController.crteateVehicle);

router.get("/", vehicleController.getAllVehicles);

router.get("/:vehicleId", vehicleController.getVehicleById);

router.put("/:vehicleId", verify, auth("admin"), vehicleController.updateVehicle);

router.delete("/:vehicleId", verify, auth("admin"), vehicleController.deleteVehicle)


export const vehicleRoute = router;