"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = exports.initRequest = void 0;
const sequelize_1 = require("sequelize");
const ReqestStatus_1 = __importDefault(require("../types/ReqestStatus"));
const user_1 = require("./user");
class Request extends sequelize_1.Model {
}
exports.Request = Request;
const init = (sequelize) => {
    return {
        setup: () => {
            Request.init({
                id: {
                    type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                    autoIncrement: true,
                    primaryKey: true,
                },
                leaveType: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false
                },
                details: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false,
                    defaultValue: ""
                },
                startDate: {
                    type: sequelize_1.DataTypes.DATEONLY,
                    allowNull: false,
                    get() {
                        const val = this.getDataValue("startDate");
                        return new Date(val);
                    },
                },
                endDate: {
                    type: sequelize_1.DataTypes.DATEONLY,
                    allowNull: false,
                    get() {
                        const val = this.getDataValue("endDate");
                        return new Date(val);
                    },
                },
                allowance: {
                    type: sequelize_1.DataTypes.BOOLEAN,
                    allowNull: false,
                    defaultValue: false,
                },
                status: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false,
                    defaultValue: ReqestStatus_1.default.PENDING,
                },
                userId: {
                    type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                    allowNull: false,
                },
                delegateeId: {
                    type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                    allowNull: false
                },
            }, {
                tableName: "requests",
                sequelize,
                defaultScope: {
                    include: 'delegatee'
                }
            });
        },
        initAssocs: () => {
            Request.belongsTo(user_1.User, { targetKey: "id", foreignKey: "userId" });
            Request.belongsTo(user_1.User, { targetKey: "id", as: "delegatee", foreignKey: "delegateeId" });
        }
    };
};
exports.initRequest = init;
//# sourceMappingURL=request.js.map