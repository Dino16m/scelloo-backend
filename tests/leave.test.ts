import InsufficientDays from '../src/Exceptions/insufficientdays'
import Leave from '../src/models/leave'
import ELeaveType from '../src/types/LeaveType'

type ILeave = {
    unpaid: number,
    annual: number,
    study: number,
    compassionate: number
}

let leaveData = {
    unpaid: 14,
    annual: 14,
    study: 14,
    compassionate: 14
} as ILeave

describe("test leave balance helper", () =>{
    let ref: { balances: ILeave }
    beforeEach(() => {
        ref = {balances: {...leaveData} }
    })
    test('Leave.Hydrate returns Leave object with the correct data ', () => {
        const leave = Leave.Hydrate(leaveData, ref)
        expect(leave.toJSON('')).toStrictEqual(leaveData)
    })

    test('Leave deduction affects underlying model', () => {
        const leave = Leave.Hydrate(leaveData, ref)
        const days = 5
        leave.deduct(ELeaveType.ANNUAL, days)
        expect(ref.balances.annual).toBe(leaveData.annual - days)
        expect(ref.balances).toStrictEqual(leave.toJSON(''))
    })

    test('Deducting more days than the balance has throws exception', () => {
        const leave = Leave.Hydrate(leaveData, ref)
        const days = leaveData.annual + 1
        expect( () => {
            leave.deduct(ELeaveType.ANNUAL, days)
        }).toThrow(InsufficientDays)
    })

    test('Leave refund affects underlying model', () => {
        const leave = Leave.Hydrate(leaveData, ref)
        const days = 5
        leave.deduct(ELeaveType.ANNUAL, days)
        const newBal = leave.toJSON('').annual
        leave.refund(ELeaveType.ANNUAL, days)

        expect(ref.balances.annual).toBe(newBal + days)
    })

    test('Attempt to over refund is ignored', () => {
        const leave = Leave.Hydrate(leaveData, ref)
        let days = 5
        
        leave.refund(ELeaveType.ANNUAL, days)
        expect(ref.balances.annual).toBeLessThanOrEqual(Leave.MAX)
    })
})