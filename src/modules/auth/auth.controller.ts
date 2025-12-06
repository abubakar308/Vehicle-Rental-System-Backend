import { Request, Response } from "express";
import { authService } from "./auth.service";

const registrationUser = async(req: Request, res: Response) =>{
    
    try{ 
        const result = await authService.registrationUser(req.body);

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: result.rows[0]
        });

    } catch(err: any){
        return res.status(500).json({
  "success": false,
  "message": err.message,
  "errors": err
        })
    }
}

const loginUser = async (req: Request, res: Response) =>{

    const { email, password } = req.body;

    try{
        const result = await authService.loginUser(email, password);

        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: result
        })


    } catch(err: any){
        return res.status(500).json({
            successs: false,
            message: err.message
        })
    }

}

export const authController = {
    registrationUser,
    loginUser
}