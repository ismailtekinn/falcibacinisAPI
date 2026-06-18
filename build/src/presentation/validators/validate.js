"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const zod_1 = require("zod");
const ValidationError_1 = require("../../shared/exceptions/ValidationError");
const validate = (schema, source = "body") => (req, _res, next) => {
    try {
        const parsed = schema.parse(req[source]);
        req[source] = parsed;
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            const details = error.flatten().fieldErrors;
            next(new ValidationError_1.ValidationError("Validation failed", details));
            return;
        }
        next(error);
    }
};
exports.validate = validate;
