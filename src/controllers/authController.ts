import {NextFunction, Request, Response} from 'express';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import User from '../models/users_model';
import { sendMail } from '../services/mailService';
import AppError from '../utils/appError';

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
        const {username, email, password} = req.body;
        console.log(username);
        const userExist = await User.findOne({email});
        if (userExist) {
            next(new AppError('Email already exists', 400, 'fail'));
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const token = uuidv4().slice(0, 6);
        console.log(token);
        const newUser = new User({
            email,
            password: hashedPassword,
            token
        })
        await newUser.save();
        await sendMail(username, email, token); 
        res.json({
            status: 'success',
            message: 'Please, confirm your email',
            code: 200,
            data: {newUser}
        });   
}

export const confirmEmailUsingToken = async (req: Request, res: Response, next: NextFunction) => {
    const {token} = req.body;
    const user = await User.findOne({token});
    if (!user || user.isConfirmed) {
        next(new AppError('Token Is Incorrect', 400, 'fail'));
        return;
    }
    user.token = '';
    user.isConfirmed = true;
    await user.save();
    res.json({
        status: 'success',
        message: 'Email Is confirmed',
        code: 200,
        data: {user}
    }); 
}

export const confirmEmailUsingLink = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.query.token;
    const user = await User.findOne({token});
    if (!user || user.isConfirmed) {
        next(new AppError('Token Is Incorrect', 400, 'fail'));
        return;
    }  
    user.token = '';
    user.isConfirmed = true;
    await user.save();
    res.json({
        status: 'success',
        message: 'Email Is confirmed',
        code: 200,
        data: {user}
    }); 
}