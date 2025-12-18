import User from "../models/user.Model.js";
import bcrypt from "bcrypt";
import  { uploadCloudinary } from "../libs/cloudinary.js";
import fs from 'fs';
import { generateToken } from '../utils/jwt.js'
import nodemailer from "nodemailer";


export const register = async (req, res) => {
   const { fullName, email,password, cnic, } = req.body;
   console.log("req.body", fullName, email,password, cnic);
   try {
      if (!fullName || !email || !password || !cnic) {
         return res.status(400).json({ message: " All fields are required " })
      }

      if (cnic.length !== 13) {
         return res.status(400).json({ message: "CNIC must be 13 digits" });
      }
      const existingUser = await User.findOne({ email });

      if (existingUser) {
         return res.status(400).json({ message: "User already exists" });
      }
     
      
      const hashedPassword = await bcrypt.hash(password, 10);
   
    
      // const transporter = nodemailer.createTransport({
      //    service: "gmail",
      //    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
      //  });
   
      //  await transporter.sendMail({
      //    from: process.env.EMAIL_USER,
      //    to: email,
      //    subject: "Your Temporary Password",
      //    text: `Your temporary password is: ${ password }`,
      //  });
      
      const user = new User({ 
         fullName,
         email,
         cnic,
         password: hashedPassword,
      });
      if (user) {
         console.log("user", user);
// save user to database
          await user.save();
         
       // generate token and set to cookie it is a function in utils/jwt.js
          generateToken(user._id, res);
          console.log("Token generated and set to cookie");
          
        
         // send response to client 
         res.status(201).json({
            message: 'User created successfully',
            user: {
               _id: user._id,
               fullName: user.fullName,
               email: user.email,
               profilePic: user.profilePic,
               role: user.role
            }
         });
      } else {
         return res.status(400).json({ message: 'Error creating user' });
      }

   } catch (error) {
  console.error("REGISTER ERROR:", error);
  res.status(500).json({
    message: "User not registered",
    error: error.message,
  });
}
};


export const login = async (req, res) => {
   const { email, password } = req.body
   try {
       const user = await User.findOne({ email });
       if(!user){
           return res.status(400).json({ message: 'invalid credentials' });
       };
       const isPasswordCorrect = await bcrypt.compare(password, user.password);
       if (!isPasswordCorrect) {
           return res.status(400).json({ message: 'invalid credentials' });
       };
       generateToken(user._id, res);
       res.status(200).json({
           message: 'Login successfully',
           _id: user._id,
           fullName: user.fullName,
           email: user.email,
           profilePic: user.profilePic,
       });
     
       
   } catch (error) {
       console.log("error in login", error);
       res.status(500).json({ message: "Internal Server error in login" });
       
   }
};


export const logout = (req, res) => {
   console.log("user logout");
   
   try {
       res.cookie('Auth_Token', '', {maxAge: 0});
       res.status(200).json({ message: 'Logged out successfully' });
   } catch (error) {
       console.log("error", error);
       res.status(500).json({ message: "Internal Server error" });
       
   }
};

export const getUser = async (req, res) => {
   try {
      const users = await User.find(); // Fetch all users
      res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch users",
        error: error.message,
      });
    }
}

export const updateProfile = async ( req, res ) => {
   
  try {

   if (!req.file) {
      return res.status(400).json({ message: "Profile picture is required" });
    }
    
    // Path to the uploaded file
    const localFilePath = req.file.path;

    // Upload to Cloudinary
    const cloudinaryResponse = await uploadCloudinary(localFilePath);

    if (!cloudinaryResponse) {
      return res.status(500).json({ message: "Failed to upload image to Cloudinary" });
    }
     // Delete local file after upload
     fs.unlinkSync(localFilePath);

     const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { profilePic: cloudinaryResponse.secure_url },
      { new: true }
    );

    res.status(200).json({
      message: 'Update successfully',
      _id: updatedUser._id,
      fullName: updatedUser.fullName,
      email: updatedUser.email,
      profilePic: updatedUser.profilePic,
      role: updatedUser.role
  });
   
  } catch (error) {
   
  }
};