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
exports.confirmEmailUsingLink = exports.confirmEmailUsingToken = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const users_model_1 = __importDefault(require("../models/users_model"));
const mailService_1 = require("../services/mailService");
const appError_1 = __importDefault(require("../utils/appError"));
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    console.log(username);
    const userExist = yield users_model_1.default.findOne({ email });
    if (userExist) {
        next(new appError_1.default('Email already exists', 400, 'fail'));
        return;
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const token = (0, uuid_1.v4)().slice(0, 6);
    console.log(token);
    const newUser = new users_model_1.default({
        email,
        password: hashedPassword,
        token
    });
    yield newUser.save();
    yield (0, mailService_1.sendMail)(username, email, token);
    res.json({
        status: 'success',
        message: 'Please, confirm your email',
        code: 200,
        data: { newUser }
    });
});
exports.registerUser = registerUser;
const confirmEmailUsingToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.body;
    const user = yield users_model_1.default.findOne({ token });
    if (!user || user.isConfirmed) {
        next(new appError_1.default('Token Is Incorrect', 400, 'fail'));
        return;
    }
    user.token = '';
    user.isConfirmed = true;
    yield user.save();
    res.json({
        status: 'success',
        message: 'Email Is confirmed',
        code: 200,
        data: { user }
    });
});
exports.confirmEmailUsingToken = confirmEmailUsingToken;
const confirmEmailUsingLink = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.query.token;
    const user = yield users_model_1.default.findOne({ token });
    if (!user || user.isConfirmed) {
        next(new appError_1.default('Token Is Incorrect', 400, 'fail'));
        return;
    }
    user.token = '';
    user.isConfirmed = true;
    yield user.save();
    res.json({
        status: 'success',
        message: 'Email Is confirmed',
        code: 200,
        data: { user }
    });
});
exports.confirmEmailUsingLink = confirmEmailUsingLink;
