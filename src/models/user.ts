import {
    Model,
    ModelDefined,
    DataTypes,
    HasManyGetAssociationsMixin,
    HasManyAddAssociationMixin,
    HasManyHasAssociationMixin,
    Association,
    HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin,
    Optional,
    Sequelize,
    HasManySetAssociationsMixin,
    HasOneGetAssociationMixin,
    HasOneCreateAssociationMixin,
} from "sequelize"
import { LeaveBalance } from "./leavebalance";

import {Request} from "./request"

enum Role {
    DELEGATEE = "delegatee",
    USER = "user"
}

interface UserAttributes {
    id: number
    name: string
    role:  Role
    email: string
}
interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

class User extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes {
    id: number;
    name: string;
    email: string
    role: Role

    addRequests: HasManyAddAssociationMixin<Request, "id">
    getRequests: HasManyGetAssociationsMixin<Request>
    setRequests: HasManySetAssociationsMixin<Request, "id">
    createRequest: HasManyCreateAssociationMixin<Request>

    getLeaveBalance: HasOneGetAssociationMixin<LeaveBalance>
    createLeaveBalance: HasOneCreateAssociationMixin<LeaveBalance>

    readonly leaveBalance?: LeaveBalance
}

const init = (sequelize: Sequelize) => {
    return {
        setup: () => {
            User.init(
                {
                  id: {
                    type: DataTypes.INTEGER.UNSIGNED,
                    autoIncrement: true,
                    primaryKey: true,
                  },
                  name: {
                    type: new DataTypes.STRING(128),
                    allowNull: false,
                  },
                  email:{
                    type: DataTypes.STRING,
                    allowNull: false
                  },
                  role:{
                    type: new DataTypes.STRING(16),
                    defaultValue: Role.USER
                  }
                },
                {
                  tableName: "users",
                  sequelize
                }
            );
        },
        initAssocs: () => {
            User.hasMany(Request, {
                sourceKey: "id",
                foreignKey: "userId",
                as: "requests"
            })
            User.hasMany(Request, {
              sourceKey: "id",
              foreignKey: "delegateeId",
              as: "pendingRequests"
          })
          User.hasOne(LeaveBalance, {
                sourceKey: "id",
                foreignKey: "userId",
                as: "leaveBalance"
          })
          User.afterCreate("createLeaveBalance", (user: User) => {
            user.createLeaveBalance()
          })
        }
    }
    
}

export  {User, init as initUser, Role}