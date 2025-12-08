import express, {Request, Response  } from "express"
import initDb from "./config/db";
import { authRoute } from "./modules/auth/auth.routes";
import { userRouter } from "./modules/users/user.routets";
import { vehicleRoute } from "./modules/vehucles/vehicle.routes";
import { bookingRoute } from "./modules/bookings/booking.routes";

const app = express();

app.use(express.json());

initDb();

app.use("/api/v1/auth", authRoute);

app.use("/api/v1/users", userRouter);

app.use("/api/v1/vehicles", vehicleRoute);

app.use("/api/v1/bookings", bookingRoute);

app.get("/", (req: Request, res: Response)=>{
    res.send("Hello from Next Level Assignment 2");
})

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path,
  });
});

export default app;