"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: {
        in: ['body'],
        errorMessage: "Name is required",
        isString: true
    },
    email: {
        in: ['body'],
        errorMessage: "Email is required",
        isEmail: true
    },
};
//# sourceMappingURL=user.schema.js.map