import ELeaveType from "./LeaveType";

export default interface LeaveRequest{
    leaveType: ELeaveType
    details: string
    startDate: Date
    endDate: Date
    allowance: boolean
    delegateeId: number
}