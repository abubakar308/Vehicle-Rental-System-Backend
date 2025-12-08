import { Router } from "express";
import { vehicleController } from "./vehicle.controller";
import verify from "../../middleware/verify";
import auth from "../../middleware/auth";



const router = Router();

router.post("/", verify, auth("admin"), vehicleController.crteateVehicle);

router.get("/", verify, auth("customer"), vehicleController.getAllVehicles);

router.get("/:vehicleId", verify, auth("customer"), vehicleController.getVehicleById);

router.put("/:vehicleId", verify, auth("admin"), vehicleController.updateVehicle);

router.delete("/:vehicleId", verify, auth("admin"), vehicleController.deleteVehicle)


export const vehicleRoute = router;