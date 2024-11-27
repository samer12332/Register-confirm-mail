import express, {NextFunction, Request, Response} from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import authRouter from './routes/authRoutes';
import AppError from './utils/appError';

const app = express(); 
dotenv.config();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Home page');
});

app.get('/register', (req, res) => {
    res.send('Register page');
});

app.use('/', authRouter);

let uri = process.env.DB_URI as string
const port = process.env.PORT as string || 3001   

mongoose.connect(uri)
.then((conn) => {
    console.log(`Database connected at ${conn.connection.host}`);
    app.listen(port, () => {
        console.log(`App listening on port ${port}`);
    });
}).catch((error) => {
    console.log(error);
});


app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const statusText = err.statusText || 'Error';

    res.status(statusCode).json({
        status: statusText,
        message: err.message,
        code: statusCode,
        data: null
    });
});
