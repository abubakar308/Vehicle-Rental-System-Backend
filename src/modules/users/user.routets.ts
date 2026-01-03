import { Router } from "express";
import { userControllers } from "./user.controller";
import verify from "../../middleware/verify";
import auth from "../../middleware/auth";

const router = Router();

router.get("", verify, auth("admin"), userControllers.getALlUsers);

router.put("/:userId", verify, auth("admin", "customer"), userControllers.updateUser);

router.delete("/:userId", verify, auth("admin"), userControllers.deleteUser);

export const userRouter = router;