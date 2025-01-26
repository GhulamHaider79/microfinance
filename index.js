import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './src/libs/db.js';
import authRoute from './src/routes/auth.Routes.js';

import cookieParser from 'cookie-parser';


const app = express();

dotenv.config();
app.use(express.json())

app.use(cookieParser());

const PORT = process.env.PORT || 8000;
const ORIGIN = process.env.ORIGIN || 'http://localhost:3000';

app.use(bodyParser.json());
app.use(
    cors(
        {
            origin: "http://localhost:5173",
            credentials:true
        }
    )
);


app.use('/api/auth', authRoute);


// app.use('/api/admin', adminRouter);

connectDB();
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});