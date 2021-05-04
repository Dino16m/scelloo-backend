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
const user_1 = require("../models/user");
const leave_1 = __importDefault(require("../models/leave"));
const LeaveType_1 = __importDefault(require("../types/LeaveType"));
const utils_1 = __importDefault(require("../utils"));
const request_1 = require("../models/request");
const sequelize_1 = require("sequelize");
const ReqestStatus_1 = __importDefault(require("../types/ReqestStatus"));
const dateNotInPast = (dateStr) => {
    const now = new Date();
    const date = new Date(dateStr);
    if (now > date)
        throw new Error("Date must be in the future");
    return true;
};
const dateWithinLeaveRange = (start, end) => {
    const days = utils_1.default.daysBetweenDates(new Date(start), new Date(end));
    if (days > leave_1.default.MAX) {
        throw new Error(`You can request only for a maximum of ${leave_1.default.MAX} days`);
    }
    return true;
};
const endDateIsAfterStart = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    if (startDate > endDate)
        throw new Error("End date must be after start date");
    return true;
};
const noParallelLeave = (value, { req }) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = Number(req.query.uid);
    const start = new Date(req.body.startDate);
    const end = new Date(req.body.endDate);
    const match = yield request_1.Request.findOne({
        where: {
            userId: userId,
            [sequelize_1.Op.or]: [
                {
                    status: ReqestStatus_1.default.PENDING
                },
                {
                    status: ReqestStatus_1.default.APPROVED
                },
            ],
            [sequelize_1.Op.or]: [
                {
                    startDate: {
                        [sequelize_1.Op.between]: [start, end]
                    }
                },
                {
                    endDate: {
                        [sequelize_1.Op.between]: [start, end]
                    }
                }
            ]
        },
    });
    if (match)
        throw new Error("Leave date overlaps with existing leaves");
    return true;
});
const strToDate = (value) => {
    return new Date(value);
};
exports.default = {
    delegateeId: {
        in: ['body'],
        isInt: true,
        custom: {
            options: (value) => __awaiter(void 0, void 0, void 0, function* () {
                const user = user_1.User.findByPk();
                if (!user)
                    throw new Error("Delegatee does not exist");
            })
        },
    },
    leaveType: {
        in: ['body'],
        custom: {
            options: (value, { req }) => {
                if (!Object.values(LeaveType_1.default).includes(value)) {
                    throw new Error("Invalid Leave type");
                }
                return true;
            }
        }
    },
    details: {
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
    startDate: {
        in: ['body'],
        isDate: true,
        custom: {
            options: (value) => {
                dateNotInPast(value);
                return true;
            }
        },
        customSanitizer: {
            options: strToDate
        },
    },
    endDate: {
        in: ['body'],
        isDate: true,
        custom: {
            options: (value, { req }) => __awaiter(void 0, void 0, void 0, function* () {
                dateNotInPast(value);
                dateWithinLeaveRange(req.body.startDate, value);
                yield noParallelLeave(value, { req });
                endDateIsAfterStart(req.body.startDate, req.body.endDate);
                return true;
            })
        },
        customSanitizer: {
            options: strToDate
        },
    }
};
//# sourceMappingURL=request.schema.js.map