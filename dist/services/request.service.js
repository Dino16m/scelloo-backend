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
const ReqestStatus_1 = __importDefault(require("../types/ReqestStatus"));
const utils_1 = __importDefault(require("../utils"));
class RequestService {
    constructor(request) {
        this.request = request;
    }
    approve() {
        return __awaiter(this, void 0, void 0, function* () {
            this.request.status = ReqestStatus_1.default.APPROVED;
            yield this.request.save();
        });
    }
    disapprove() {
        return __awaiter(this, void 0, void 0, function* () {
            this.request.status = ReqestStatus_1.default.DISAPPROVED;
            const requester = yield this.request.getUser();
            const leaves = yield requester.getLeaveBalance();
            const leaveDays = utils_1.default.daysBetweenDates(this.request.startDate, this.request.endDate);
            leaves.balances.refund(this.request.leaveType, leaveDays);
            yield leaves.save();
            yield this.request.save();
        });
    }
}
exports.default = RequestService;
//# sourceMappingURL=request.service.js.map