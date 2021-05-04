"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __importDefault(require("../utils"));
class UserService {
    constructor(user) {
        this.user = user;
    }
    /**
     * @param request
     * @throws — InsufficientDays when user tries to deduct more days than they have
     */
    requestLeave(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const days = utils_1.default.daysBetweenDates(request.startDate, request.endDate);
            const bal = yield this.user.getLeaveBalance();
            bal.balances.deduct(request.leaveType, days);
            const newRequest = yield this.user.createRequest(request);
            bal.save();
            return newRequest;
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=user.service.js.map