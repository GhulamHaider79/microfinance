import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const generateToken = (id, res) => {

    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '7d', 
    });

    res.cookie('token', token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    });


    return token;

}