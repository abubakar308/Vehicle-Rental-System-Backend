import { Request, Response } from "express"
import { userServices } from "./user.service"
import { JwtPayload } from "jsonwebtoken";

const getALlUsers = async(req: Request, res: Response) =>{

    try{

        const result = await userServices.getALlUsers();
          return res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: result.rows
        })


    } catch(err: any){
        return res.status(500).json({
            success: false,
            messasge: err.messasge

        })
    }
};


const updateUser = async (req: Request, res: Response) =>{
    const payload = req.body;
  const loggedInUser = req.user as JwtPayload;
  const { email } = req.body;

try {
    if (loggedInUser.role !== "admin" && loggedInUser.email !== email ) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: You can only update your own profile",
      });
    }

    const result = await userServices.updateUser(
      payload,
      req.params.userId as string
    );
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}


const deleteUser = async(req: Request, res: Response) =>{
    try{
        const result = await userServices.deleteUser(req.params.id as string);
        console.log(result);

        if(result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: " user not found"
            }) 
        } else{
            res.status(200).json({
                success: true,
                message: "user deleted successfully",

            })
        }

    }catch(err: any){
        res.status(500).json({
            success: false,
            message: err.message
        })

    }
}

export const userControllers = {
    getALlUsers,
    updateUser,
    deleteUser
}