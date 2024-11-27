"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asyncHandler = (asyncFn) => {
    return (req, res, next) => {
        asyncFn(req, res, next).catch(next);
    };
};
exports.default = asyncHandler;
