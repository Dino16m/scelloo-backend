import {
    Model,
    DataTypes,
    Optional,
    Sequelize,
    BelongsToGetAssociationMixin,
    BelongsToSetAssociationMixin,
} from "sequelize"
import Leave from "./leave"
import { User } from "./user"

interface LeaveBalanceAttributes{
    id: number

    balances: Leave
    currentYear: number
    userId: number
}

interface LeaveBalanceCreationAttributes 
    extends Optional<LeaveBalanceAttributes, "id"> {}

class LeaveBalance extends Model<LeaveBalanceAttributes, LeaveBalanceCreationAttributes>
    implements LeaveBalanceAttributes{
        
        id: number
        balances: Leave
        currentYear: number
        userId: number
}

const init = (sequelize: Sequelize) => {
    return {
        setup: () => {
            LeaveBalance.init({
                id: {
                    type: DataTypes.INTEGER.UNSIGNED,
                    autoIncrement: true,
                    primaryKey: true,
                },
                balances: {
                    type: DataTypes.JSON,
                    defaultValue: new Leave(),
                    allowNull: false,
                    get(){
                        const val = this.getDataValue("balances")
                        if(val){
                            const value = typeof val == 'string' ? JSON.parse(val) : val
                            return Leave.Hydrate(value, this)
                        }
                        return Leave.Hydrate({}, this)
                    },
                },
                currentYear: {
                    type: DataTypes.INTEGER,
                    defaultValue: new Date().getFullYear()
                },
                userId:{
                    type: DataTypes.INTEGER.UNSIGNED
                }
            },
            {
                tableName: "leavebalances",
                sequelize
              }
            )
        },
        initAssocs: () => {
            LeaveBalance.belongsTo(
                User, {targetKey: "id", foreignKey: "userId"}
            ) 
        }
    }
}

export {LeaveBalance, init as initLeaveBalance}