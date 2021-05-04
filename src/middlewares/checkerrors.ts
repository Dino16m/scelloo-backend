import { Request, Response, NextFunction } from "express"
import { validationResult } from "express-validator";

export const checkReqErrors = (req: Request, res: Response, next:  NextFunction) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next('route')
        return res.status(400).json({status: false, errors: errors.array() });
    }
    next()
}
