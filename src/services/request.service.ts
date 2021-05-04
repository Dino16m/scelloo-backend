import ERequestStatus from "../types/ReqestStatus";
import { Request } from "../models/request";
import utils from  '../utils'

export default class RequestService{

    constructor(private request: Request){}

    async approve(){
        this.request.status = ERequestStatus.APPROVED
        await this.request.save()
    }

    async disapprove(){
        this.request.status = ERequestStatus.DISAPPROVED
        const requester = await this.request.getUser()
        const leaves = await requester.getLeaveBalance()
        const leaveDays = utils.daysBetweenDates(
            this.request.startDate, this.request.endDate
        )
        leaves.balances.refund(this.request.leaveType, leaveDays)
        await leaves.save()
        await this.request.save()
    }
}