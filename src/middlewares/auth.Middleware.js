import jwt from 'jsonwebtoken';
import User from '../models/user.Model.js';

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        };
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ message: 'Unauthorized' });
        };

        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        };
        req.user = user;
        next();

    } catch (error) {
        console.log(error.message);

        res.status(500).json({ message: error.message });
    }
};

// Middleware to check for admin role
export const adminOnly = (req, res, next) => {
    if (req.user.role !== 'admin') { // Assuming 'role' is a field in your User model
        return res.status(403).json({ message: "Access denied. Admins only." });
    }
    next();
};


export const userOnly = (req, res, next) => {
    if (req.user.role !== 'user') {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }
    next();
};