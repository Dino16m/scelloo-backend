"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkReqErrors = void 0;
const express_validator_1 = require("express-validator");
const checkReqErrors = (req, res, next) => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        next('route');
        return res.status(400).json({ status: false, errors: errors.array() });
    }
    next();
};
exports.checkReqErrors = checkReqErrors;
//# sourceMappingURL=checkerrors.js.map