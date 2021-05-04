"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = exports.initUser = exports.User = void 0;
const sequelize_1 = require("sequelize");
const leavebalance_1 = require("./leavebalance");
const request_1 = require("./request");
var Role;
(function (Role) {
    Role["DELEGATEE"] = "delegatee";
    Role["USER"] = "user";
})(Role || (Role = {}));
exports.Role = Role;
class User extends sequelize_1.Model {
}
exports.User = User;
const init = (sequelize) => {
    return {
        setup: () => {
            User.init({
                id: {
                    type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                    autoIncrement: true,
                    primaryKey: true,
                },
                name: {
                    type: new sequelize_1.DataTypes.STRING(128),
                    allowNull: false,
                },
                email: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false
                },
                role: {
                    type: new sequelize_1.DataTypes.STRING(16),
                    defaultValue: Role.USER
                }
            }, {
                tableName: "users",
                sequelize
            });
        },
        initAssocs: () => {
            User.hasMany(request_1.Request, {
                sourceKey: "id",
                foreignKey: "userId",
                as: "requests"
            });
            User.hasMany(request_1.Request, {
                sourceKey: "id",
                foreignKey: "delegateeId",
                as: "pendingRequests"
            });
            User.hasOne(leavebalance_1.LeaveBalance, {
                sourceKey: "id",
                foreignKey: "userId",
                as: "leaveBalance"
            });
            User.afterCreate("createLeaveBalance", (user) => {
                user.createLeaveBalance();
            });
        }
    };
};
exports.initUser = init;
//# sourceMappingURL=user.js.map