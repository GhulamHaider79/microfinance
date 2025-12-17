import express from 'express';
import { getUser, login, logout, register, updateProfile } from '../controllers/user.controllers.js';
import { protectRoute } from '../middlewares/auth.middleware.js';
import { upload } from '../utils/multer.js';

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.post('/logout', logout);

router.get('/getUser', getUser);

router.put ('/update-profile', protectRoute, upload.single("profilePic"), updateProfile );




export default router;