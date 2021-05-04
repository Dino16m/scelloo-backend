import { Sequelize } from "sequelize/types";
import { initLeaveBalance } from "./leavebalance";
import { initRequest } from "./request";
import {initUser} from './user'

function setupDatabase(sequelize: Sequelize) {
    const userInit = initUser(sequelize)
    const requestInit = initRequest(sequelize)
    const leavesInit = initLeaveBalance(sequelize)

    userInit.setup()
    requestInit.setup()
    leavesInit.setup()


    // The setup functions above must be called before 
    // the associations are initialized
    userInit.initAssocs()
    requestInit.initAssocs()
    leavesInit.initAssocs()


    sequelize.sync()
}
export default setupDatabase