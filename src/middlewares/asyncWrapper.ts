import { Request, Response, NextFunction } from 'express';

const asyncHandler = (asyncFn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        asyncFn(req, res, next).catch(next);
    };
};

export default asyncHandler;
