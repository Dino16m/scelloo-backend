"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const sequelize_1 = require("sequelize");
const models_1 = __importDefault(require("./models"));
const user_controller_1 = require("./controllers/user.controller");
const request_controller_1 = require("./controllers/request.controller");
const error_middleware_1 = require("./middlewares/error.middleware");
dotenv.config();
const app = express_1.default();
const frontendURL = process.env.CLIENT_URL || "http://localhost:8080"; // defaults to vue dev server
const corsOptions = { origin: frontendURL, };
const dbUrl = process.env.DB_URL;
if (!dbUrl) {
    throw new Error("database url is required for this app to function");
}
const sequelize = new sequelize_1.Sequelize(dbUrl);
models_1.default(sequelize);
app.use(cors_1.default(corsOptions));
app.use(express_1.default.json());
app.use(error_middleware_1.errorHandler);
app.use("/users", user_controller_1.userRouter);
app.use("/leaves", request_controller_1.reqRouter);
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
//# sourceMappingURL=index.js.map