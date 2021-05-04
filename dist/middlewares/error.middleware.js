"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const http_exception_1 = __importDefault(require("../Exceptions/http.exception"));
const errorHandler = (error, request, response, next) => {
    let status = 500;
    if (error instanceof http_exception_1.default) {
        status = error.statusCode || error.status || 500;
    }
    response.status(status).send(error);
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.middleware.js.map