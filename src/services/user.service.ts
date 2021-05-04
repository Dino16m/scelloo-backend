import { User } from "../models/user";
import LeaveRequest from "../types/LeaveRequest";
import utils from  '../utils'


export default class UserService{
    constructor(private user: User){}

    /**
     * @param request 
     * @throws — InsufficientDays when user tries to deduct more days than they have
     */
    async requestLeave(request: LeaveRequest){
        const days = utils.daysBetweenDates(request.startDate, request.endDate)
        
        const bal = await this.user.getLeaveBalance()
        bal.balances.deduct(request.leaveType, days)
        const newRequest = await this.user.createRequest(request as any)
        
        bal.save()
        
        return newRequest
    }
}