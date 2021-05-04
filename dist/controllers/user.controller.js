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
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const checkerrors_1 = require("../middlewares/checkerrors");
const user_1 = require("../models/user");
exports.userRouter = express_1.default.Router();
const user_schema_1 = __importDefault(require("../Schemas/user.schema"));
exports.userRouter.post("/create", express_validator_1.checkSchema(user_schema_1.default), checkerrors_1.checkReqErrors, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userVals = express_validator_1.matchedData(req);
    const user = yield user_1.User.create(userVals);
    res.status(200).send({ status: true, user: user });
}));
exports.userRouter.post("/create-delegatee", express_validator_1.checkSchema(user_schema_1.default), checkerrors_1.checkReqErrors, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userVals = express_validator_1.matchedData(req);
    const user = yield user_1.User.create(Object.assign(Object.assign({}, userVals), { role: user_1.Role.DELEGATEE }));
    res.status(200).send({ status: true, user: user });
}));
//# sourceMappingURL=user.controller.js.map