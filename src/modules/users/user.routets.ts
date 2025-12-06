import { Router } from "express";
import { userControllers } from "./user.controller";

const router = Router();

router.get("", userControllers.getALlUsers);

router.put("/:userId", userControllers.updateUser);

router.delete("/:id", userControllers.deleteUser);

export const userRouter = router;