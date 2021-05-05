import InsufficientDays from "../Exceptions/insufficientdays"
import ELeaveType from "../types/LeaveType"

export default class Leave{
    static readonly  MAX = 14 // Maximum number of days that can be requested

    private ref: any
    
    unpaid = Leave.MAX
    annual = Leave.MAX
    study = Leave.MAX
    compassionate = Leave.MAX

    /**
     * @param obj 
     * @returns Leave object with data properties from obj
     */
    static Hydrate(obj: Object, ref: any): Leave{
        const leave = Object.assign(new Leave(), obj)
        leave.ref = ref
        return leave
    }

    reset(){
        this.unpaid = Leave.MAX
        this.annual = Leave.MAX
        this.study =  Leave.MAX
        this.compassionate = Leave.MAX

        this.mutated()
    }

    /**
     * 
     * @param leaveType 
     * @param days 
     * increases the balance of leaveType by days, 
     * sets balance to MAX if the increment causes leaveType to have a balance 
     * greater than max
     */
    refund(leaveType: ELeaveType, days: number){
        switch (leaveType) {
            case ELeaveType.ANNUAL:
                this.annual = this._refund(this.annual, days)        
                break;
            case ELeaveType.COMPASSIONATE:
                this.compassionate = this._refund(this.compassionate, days)        
                break;
            case ELeaveType.STUDY:
                this.study = this._refund(this.study, days)
                break
            case ELeaveType.UNPAID:
                this.unpaid = this._refund(this.unpaid, days)
            default:
                break;
        }

        this.mutated()
    }

    private _refund(balance: number, days: number){
        const newBal = balance + days
        if (newBal > Leave.MAX) return Leave.MAX
        return newBal
    }

    /**
     * @param leaveType 
     * @param days 
     * @throws InsufficientDays when user tries to deduct more days than they have
     */
    deduct(leaveType: ELeaveType, days: number){
        switch (leaveType) {
            case ELeaveType.ANNUAL:
                this.annual = this._deduct(this.annual, days)        
                break;
            case ELeaveType.COMPASSIONATE:
                this.compassionate = this._deduct(this.compassionate, days)        
                break;
            case ELeaveType.STUDY:
                this.study = this._deduct(this.study, days)
                break
            case ELeaveType.UNPAID:
                this.unpaid = this._deduct(this.unpaid, days)
            default:
                break;
        }
        this.mutated()
    }

    private _deduct(balance: number, days: number){
        if (days > balance) {
            throw new InsufficientDays(
                `You don't have up to ${days} days`
            )
        }
        return balance - days
    }

    
    toJSON(key?: any){
        return {
            unpaid: this.unpaid,
            annual: this.annual,
            study: this.study,
            compassionate: this.compassionate
        }
    }
    /**
     * Sequelize getters always return a new value when called, without caching
     *  this method below makes the ref(a sequelize model) to update the field
     * tracked by this class.
     */
    private mutated(){
        this.ref.balances = this.toJSON("")
    }
}
