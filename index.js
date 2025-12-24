import express from 'express';

import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './src/libs/db.js';
import userauth from './src/routes/userAuth.routes.js';
import loanroutes from './src/routes/userloan.routes.js';

import cookieParser from 'cookie-parser';


const app = express();

dotenv.config();
app.use(express.json())

app.use(cookieParser());

const PORT = process.env.PORT || 8000;


const allowedOrigins = [
  "http://localhost:5173",
  "https://microfinance-frontend-black.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin like curl or Postman
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, origin); // echo back the request origin
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true, // allow cookies
  })
);




// const ORIGIN = process.env.ORIGIN || "http://localhost:5173";


// app.use(
//     cors(
//         {
//             origin: ORIGIN,
//             credentials:true
//         }
//     )
// );





// /api/auth/register
// /api/auth//login
// /api/loan/apply-loan

app.use('/api/auth', userauth);
app.use('/api/loan', loanroutes)

// Connect to MongoDB
connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});