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
exports.reqRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const user_service_1 = __importDefault(require("../services/user.service"));
const checkerrors_1 = require("../middlewares/checkerrors");
const user_1 = require("../models/user");
exports.reqRouter = express_1.default.Router();
const request_schema_1 = __importDefault(require("../Schemas/request.schema"));
const request_1 = require("../models/request");
const request_service_1 = __importDefault(require("../services/request.service"));
exports.reqRouter.post("/request", express_validator_1.checkSchema(request_schema_1.default), checkerrors_1.checkReqErrors, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = Number(req.query.uid);
    const user = yield user_1.User.findByPk(userId);
    const userService = new user_service_1.default(user);
    const requestData = express_validator_1.matchedData(req);
    const newRequest = yield userService.requestLeave(requestData);
    res.status(200).send({ status: true, data: { request: newRequest } });
}));
exports.reqRouter.post("/approve/:id", express_validator_1.param("id").isNumeric(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requestId = req.params.id;
    const request = yield request_1.Request.findByPk(requestId);
    if (!request) {
        return res.status(400).send({ status: false, errors: "invalid request id" });
    }
    const requestService = new request_service_1.default(request);
    yield requestService.approve();
    res.send({ status: true });
}));
exports.reqRouter.post("/disapprove/:id", express_validator_1.param("id").isNumeric(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requestId = req.params.id;
    const request = yield request_1.Request.findByPk(requestId);
    if (!request) {
        return res.status(400).send({ status: false, errors: "invalid request id" });
    }
    const requestService = new request_service_1.default(request);
    yield requestService.disapprove();
    res.send({ status: true });
}));
exports.reqRouter.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allRequests = yield request_1.Request.findAll();
    res.send({ status: true, data: { requests: allRequests } });
}));
exports.reqRouter.get('/delegatees', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const delegatees = yield user_1.User.findAll({
        where: {
            role: user_1.Role.DELEGATEE
        }
    });
    res.send({ status: true, data: { delegatees: delegatees } });
}));
exports.reqRouter.get("/balances", express_validator_1.query("id").isNumeric(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = Number(req.query.uid);
    const user = yield user_1.User.findByPk(userId);
    if (user) {
        const leaveBalance = yield user.getLeaveBalance();
        return res.send({ status: true, data: { leaveBalance: leaveBalance.balances } });
    }
    res.send({ status: false, error: "user not found" });
}));
//# sourceMappingURL=request.controller.js.map