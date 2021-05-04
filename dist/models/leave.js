"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const insufficientdays_1 = __importDefault(require("../Exceptions/insufficientdays"));
const LeaveType_1 = __importDefault(require("../types/LeaveType"));
class Leave {
    constructor() {
        this.unpaid = Leave.MAX;
        this.annual = Leave.MAX;
        this.study = Leave.MAX;
        this.compassionate = Leave.MAX;
    }
    /**
     * @param obj
     * @returns Leave object with data properties from obj
     */
    static Hydrate(obj, ref) {
        const leave = Object.assign(new Leave(), obj);
        leave.ref = ref;
        return leave;
    }
    reset() {
        this.unpaid = Leave.MAX;
        this.annual = Leave.MAX;
        this.study = Leave.MAX;
        this.compassionate = Leave.MAX;
        this.mutated();
    }
    /**
     *
     * @param leaveType
     * @param days
     * increases the balance of leaveType by days,
     * sets balance to MAX if the increment causes leaveType to have a balance
     * greater than max
     */
    refund(leaveType, days) {
        switch (leaveType) {
            case LeaveType_1.default.ANNUAL:
                this.annual = this._refund(this.annual, days);
                break;
            case LeaveType_1.default.COMPASSIONATE:
                this.compassionate = this._refund(this.compassionate, days);
                break;
            case LeaveType_1.default.STUDY:
                this.study = this._refund(this.study, days);
                break;
            case LeaveType_1.default.UNPAID:
                this.unpaid = this._refund(this.unpaid, days);
            default:
                break;
        }
        this.mutated();
    }
    _refund(balance, days) {
        const newBal = balance + days;
        if (newBal > Leave.MAX)
            return Leave.MAX;
        return newBal;
    }
    /**
     * @param leaveType
     * @param days
     * @throws InsufficientDays when user tries to deduct more days than they have
     */
    deduct(leaveType, days) {
        switch (leaveType) {
            case LeaveType_1.default.ANNUAL:
                this.annual = this._deduct(this.annual, days);
                break;
            case LeaveType_1.default.COMPASSIONATE:
                this.compassionate = this._deduct(this.compassionate, days);
                break;
            case LeaveType_1.default.STUDY:
                this.study = this._deduct(this.study, days);
                break;
            case LeaveType_1.default.UNPAID:
                this.unpaid = this._deduct(this.unpaid, days);
            default:
                break;
        }
        this.mutated();
    }
    _deduct(balance, days) {
        if (days > balance) {
            throw new insufficientdays_1.default(`You don't have up to ${days} days`);
        }
        return balance - days;
    }
    toJSON(key) {
        return {
            unpaid: this.unpaid,
            annual: this.annual,
            study: this.study,
            compassionate: this.compassionate
        };
    }
    mutated() {
        this.ref.balances = this.toJSON("");
    }
}
exports.default = Leave;
Leave.MAX = 14; // Maximum number of days that can be requested
//# sourceMappingURL=leave.js.map