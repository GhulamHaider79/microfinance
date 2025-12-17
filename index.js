import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './src/libs/db.js';
import auth from './src/routes/auth.routes.js';
import loanroutes from './src/routes/loan.routes.js';

import cookieParser from 'cookie-parser';


const app = express();

dotenv.config();
app.use(express.json())

app.use(cookieParser());

const PORT = process.env.PORT || 8000;
app.use(bodyParser.json());

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

app.options("*", cors({ credentials: true, origin: allowedOrigins }));

app.get("/", (req, res) => {
  res.send("Backend is running");
});


// /api/auth/register

app.use('/api/auth', auth);
app.use('/api/loan', loanroutes)

// Connect to MongoDB
connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});