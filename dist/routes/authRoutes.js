"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const asyncWrapper_1 = __importDefault(require("../middlewares/asyncWrapper"));
const router = express_1.default.Router();
router.post('/register', (0, asyncWrapper_1.default)(authController_1.registerUser));
router.post('/register/confirm-mail', (0, asyncWrapper_1.default)(authController_1.confirmEmailUsingToken));
router.get('/register/confirm', (0, asyncWrapper_1.default)(authController_1.confirmEmailUsingLink));
exports.default = router;
