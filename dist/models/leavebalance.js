"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initLeaveBalance = exports.LeaveBalance = void 0;
const sequelize_1 = require("sequelize");
const leave_1 = __importDefault(require("./leave"));
const user_1 = require("./user");
class LeaveBalance extends sequelize_1.Model {
}
exports.LeaveBalance = LeaveBalance;
const init = (sequelize) => {
    return {
        setup: () => {
            LeaveBalance.init({
                id: {
                    type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                    autoIncrement: true,
                    primaryKey: true,
                },
                balances: {
                    type: sequelize_1.DataTypes.JSON,
                    defaultValue: new leave_1.default(),
                    allowNull: false,
                    get() {
                        const val = this.getDataValue("balances");
                        if (val) {
                            return leave_1.default.Hydrate(JSON.parse(val), this);
                        }
                        return leave_1.default.Hydrate({}, this);
                    },
                },
                currentYear: {
                    type: sequelize_1.DataTypes.INTEGER,
                    defaultValue: new Date().getFullYear()
                },
                userId: {
                    type: sequelize_1.DataTypes.INTEGER.UNSIGNED
                }
            }, {
                tableName: "leavebalances",
                sequelize
            });
        },
        initAssocs: () => {
            LeaveBalance.belongsTo(user_1.User, { targetKey: "id", foreignKey: "userId" });
        }
    };
};
exports.initLeaveBalance = init;
//# sourceMappingURL=leavebalance.js.map