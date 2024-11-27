"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.get('/', (req, res) => {
    res.send('Home page');
});
app.get('/register', (req, res) => {
    res.send('Register page');
});
app.use('/', authRoutes_1.default);
let uri = process.env.DB_URI;
const port = process.env.PORT || 3001;
mongoose_1.default.connect(uri)
    .then((conn) => {
    console.log(`Database connected at ${conn.connection.host}`);
    app.listen(port, () => {
        console.log(`App listening on port ${port}`);
    });
}).catch((error) => {
    console.log(error);
});
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const statusText = err.statusText || 'Error';
    res.status(statusCode).json({
        status: statusText,
        message: err.message,
        code: statusCode,
        data: null
    });
});
