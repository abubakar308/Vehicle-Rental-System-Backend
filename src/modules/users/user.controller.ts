import { Request, Response } from "express"
import { userServices } from "./user.service"

const getALlUsers = async(req: Request, res: Response) =>{

    try{

        const result = await userServices.getALlUsers();
          return res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: result.rows[0]
        })


    } catch(err: any){
        return res.status(500).json({
            ssuccess: false,
            mesasge: err.mesasge

        })
    }
};


const updateUser = async (req: Request, res: Response) =>{
const {id} = req.body;
console.log(id);

try{
const result = await userServices.updateUser(req.params.id!);

   return res.status(200).json({
            success: true,
            mesage: "User updated successfully",
            data: result.rows[0]
        })

} catch(err:any){
       return res.status(500).json({
            successs: false,
            message: err.message
        })
}
}


const deleteUser = async(req: Request, res: Response) =>{
    try{
        const result = await userServices.deleteUser(req.params.id!)

        if(result.rowCount == 0) {
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