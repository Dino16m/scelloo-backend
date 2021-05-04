import express, { Request, Response } from "express"
import {checkSchema, matchedData} from 'express-validator'
import { checkReqErrors } from "../middlewares/checkerrors"
import { User, Role } from "../models/user"

export const userRouter = express.Router()

import UserSchema from '../Schemas/user.schema'

userRouter.post("/create", 
    checkSchema(UserSchema),
    checkReqErrors,
    async (req: Request, res: Response) => {
        const userVals = matchedData(req) as any
        const user = await User.create(userVals) 
        res.status(200).send({status: true, user: user})
})

userRouter.post("/create-delegatee", 
    checkSchema(UserSchema),
    checkReqErrors,
    async (req: Request, res: Response) => {
        const userVals = matchedData(req) as any
        const user = await User.create({...userVals, role: Role.DELEGATEE}) 
        res.status(200).send({status: true, user: user})
})
