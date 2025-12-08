import { NextFunction, Request, Response } from "express";

const verify = (req: Request, res: Response, next: NextFunction) =>{
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}\n`);
    next();
}

export default verify;