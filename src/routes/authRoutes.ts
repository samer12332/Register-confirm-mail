import express from 'express';
import {registerUser, confirmEmailUsingToken, confirmEmailUsingLink} from '../controllers/authController'
import asyncHandler from '../middlewares/asyncWrapper';
const router = express.Router();

router.post('/register', asyncHandler(registerUser));
router.post('/register/confirm-mail', asyncHandler(confirmEmailUsingToken));
router.get('/register/confirm', asyncHandler(confirmEmailUsingLink));



export default router;