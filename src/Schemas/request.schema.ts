import { Schema } from "express-validator";
import { User } from "../models/user";
import Leave from "../models/leave";
import ELeaveType from "../types/LeaveType";
import utils from '../utils'
import { Request } from "../models/request";
import {Op} from 'sequelize'
import ERequestStatus from "../types/ReqestStatus";

const dateNotInPast = (dateStr: string) => {
    const now = new Date()
    const date = new Date(dateStr)
    if (now > date) throw new Error("Date must be in the future");
    return true
}

const dateWithinLeaveRange = (start: string, end: string) => {
    const days = utils.daysBetweenDates(
        new Date(start), new Date(end)
    )
    if (days > Leave.MAX){
        throw new Error(`You can request only for a maximum of ${Leave.MAX} days`);
    }
    return true

}

const endDateIsAfterStart = (start: string, end: string) => {
    const startDate = new Date(start)
    const endDate = new Date(end)
    if(startDate > endDate) throw new Error("End date must be after start date")
    return true

}
const noParallelLeave = async (value: string, {req}: any) =>{
    const userId = Number(req.query.uid)
    const start = new Date(req.body.startDate)
    const end = new Date(req.body.endDate)
    const match = await Request.findOne({
        where: {
            userId: userId,
            [Op.or]: [
                {
                    status: ERequestStatus.PENDING
                },
                {
                    status: ERequestStatus.APPROVED
                },
            ],
            [Op.or]: [
               {
                   startDate: {
                       [Op.between]: [start, end]
                   }
                },
                {
                    endDate: {
                        [Op.between]: [start, end]
                    }
                 }
            ]
        },
    })
    if(match) throw new Error("Leave date overlaps with existing leaves");
    return true
}
const strToDate = (value: string) => {
    return new Date(value)
}

export default {
    delegateeId:{
        in: ['body'],
        isInt: true,
        custom: {
            options: async (value: any) =>{
                const user = User.findByPk()
                if (!user) throw new Error("Delegatee does not exist")
            }
        },
    },
    leaveType: {
        in: ['body'],
        custom: {
            options: (value: any,  {req}) =>{
                if(!Object.values(ELeaveType).includes(value)){
                    throw new Error("Invalid Leave type")
                }
                return true
            }
        }
    },
    details:{
        in: ['body'],
        errorMessage: "details must be a string",
        default: "",
        isString: true
    },
    allowance: {
        in: ['body'],
        default: false,
        isBoolean: true
    },
    startDate:{
        in: ['body'],
        isDate: true,
        custom: {
            options: (value: any) =>{
                dateNotInPast(value)
                return true
            }
        },
        customSanitizer: {
            options: strToDate
        },
    },
    endDate:{
        in: ['body'],
        isDate: true,
        custom: {
            options: async (value: any,  {req}) =>{
                dateNotInPast(value)
                dateWithinLeaveRange(req.body.startDate, value)
                await noParallelLeave(value, {req})
                endDateIsAfterStart(req.body.startDate, req.body.endDate)
                return true
            }
        },
        customSanitizer: {
            options: strToDate
        },
    }
} as Schema
