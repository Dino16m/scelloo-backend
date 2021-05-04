import {
    Model,
    DataTypes,
    Optional,
    Sequelize,
    BelongsToGetAssociationMixin,
    BelongsToSetAssociationMixin,
} from "sequelize"
import ERequestStatus from "../types/ReqestStatus"

import ELeaveType from '../types/LeaveType'
import { User } from "./user"

interface RequestAttributes {
    id: number
    leaveType: ELeaveType
    details: string
    startDate: Date
    endDate: Date
    allowance: boolean
    status: ERequestStatus
    userId: number
    delegateeId: number
    delegatee?: User
}

interface RequestCreationAttributes extends Optional<RequestAttributes, "id"> {}

class Request extends Model<RequestAttributes, RequestCreationAttributes>
    implements RequestAttributes{
        id!:  number
        leaveType: ELeaveType
        details: string
        startDate: Date
        endDate: Date
        allowance: boolean

        status: ERequestStatus
        userId: number
        delegateeId: number

        delegatee?: User

        getUser: BelongsToGetAssociationMixin<User>

        getDelegatee: BelongsToGetAssociationMixin<User>
        setDelegatee: BelongsToSetAssociationMixin<User, "id">

}

const init = (sequelize: Sequelize) => {

    return{
        setup: () => {
            Request.init(
                {
                  id: {
                    type: DataTypes.INTEGER.UNSIGNED,
                    autoIncrement: true,
                    primaryKey: true,
                  },
                  leaveType:{
                      type: DataTypes.STRING,
                      allowNull: false
                  },
                  details: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    defaultValue: ""
                  },
                  startDate: {
                      type: DataTypes.DATEONLY,
                      allowNull: false,
                      get(){
                        const val = this.getDataValue("startDate")
                        return new Date(val)
                    },
                  },
                   endDate: {
                        type: DataTypes.DATEONLY,
                        allowNull: false,
                        get(){
                            const val = this.getDataValue("endDate")
                            return new Date(val)
                        },
                    },
                    allowance:{
                        type: DataTypes.BOOLEAN,
                        allowNull: false,
                        defaultValue: false,
                    },
                    status:{
                        type: DataTypes.STRING,
                        allowNull: false,
                        defaultValue: ERequestStatus.PENDING,
                    },
                    userId:{
                        type: DataTypes.INTEGER.UNSIGNED,
                        allowNull: false,
                    },
                    delegateeId:{
                        type: DataTypes.INTEGER.UNSIGNED,
                        allowNull: false
                    },

                },
                {
                  tableName: "requests",
                  sequelize
                }
            );
        },
        initAssocs: () => {
            
            Request.belongsTo(
                User, {targetKey: "id", foreignKey: "userId"}
            )
            Request.belongsTo(
                User, {targetKey: "id", as: "delegatee", foreignKey: "delegateeId"}
            )
        }
    }
    
}


export {init as initRequest, Request}