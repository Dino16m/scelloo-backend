import { Schema } from "express-validator";

export default {
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
} as Schema