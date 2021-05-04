"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const leavebalance_1 = require("./leavebalance");
const request_1 = require("./request");
const user_1 = require("./user");
function setupDatabase(sequelize) {
    const userInit = user_1.initUser(sequelize);
    const requestInit = request_1.initRequest(sequelize);
    const leavesInit = leavebalance_1.initLeaveBalance(sequelize);
    userInit.setup();
    requestInit.setup();
    leavesInit.setup();
    // The setup functions above must be called before 
    // the associations are initialized
    userInit.initAssocs();
    requestInit.initAssocs();
    leavesInit.initAssocs();
    sequelize.sync();
}
exports.default = setupDatabase;
//# sourceMappingURL=index.js.map