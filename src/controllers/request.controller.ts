import express, { Request, Response } from "express"
import {checkSchema, matchedData, param, query} from 'express-validator'
import UserService from "../services/user.service"
import { checkReqErrors } from "../middlewares/checkerrors"
import { Role, User } from "../models/user"

export const reqRouter = express.Router()

import RequestSchema from '../Schemas/request.schema'
import { Request as LeaveRequest } from "../models/request"
import RequestService from "../services/request.service"

reqRouter.post("/request", 
    checkSchema(RequestSchema),
    checkReqErrors,
    async (req: Request, res: Response) => {
        const userId = Number(req.query.uid)
        const user = await User.findByPk(userId)
        const userService = new UserService(user)
        const requestData = matchedData(req) as any
        const newRequest =   await userService.requestLeave(requestData)
        const delegatee = await newRequest.getDelegatee()

        const reqWithDelegatee = {...newRequest.toJSON(), delegatee: delegatee}

        res.status(200).send(
            {status: true, data: {request: reqWithDelegatee}}
        )
})

reqRouter.post(
    "/approve/:id", 
    param("id").isNumeric(),
    async  (req: Request, res: Response) => {
        const requestId = req.params.id
        const request = await LeaveRequest.findByPk(requestId)
        if (!request) {
            return res.status(400).send({status: false, errors: "invalid request id" })
        }
        const requestService = new RequestService(request)
        await requestService.approve()

        res.send({status: true})
    }
)

reqRouter.post(
    "/disapprove/:id", 
    param("id").isNumeric(),
    async  (req: Request, res: Response) => {
        const requestId = req.params.id
        const request = await LeaveRequest.findByPk(requestId)
        if (!request) {
            return res.status(400).send({status: false, errors: "invalid request id" })
        }
        const requestService = new RequestService(request)
        await requestService.disapprove()

        res.send({status: true})
    }
)

reqRouter.get(
    "/all",
    async  (req: Request, res: Response) => {
        const allRequests = await LeaveRequest.findAll()
        res.send({status: true, data:{requests: allRequests}})
    }
)

reqRouter.get(
    '/delegatees',
    async  (req: Request, res: Response) => {
        const delegatees = await User.findAll({
            where:{
                role: Role.DELEGATEE
            }
        })
        res.send({status: true, data: {delegatees: delegatees}})
    }
)

reqRouter.get(
    "/balances",
    query("id").isNumeric(),
    async  (req: Request, res: Response) => {
        const userId = Number(req.query.uid)
        const user = await User.findByPk(userId)
        if(user){
            const leaveBalance = await user.getLeaveBalance()
            return res.send({status: true, data: {leaveBalance: leaveBalance.balances}})
        }
        res.send({status: false, error: "user not found"})
    }
)

reqRouter.post(
    "/reset",
    async  (req: Request, res: Response) => {
        LeaveRequest.destroy({truncate: true})
    }
)