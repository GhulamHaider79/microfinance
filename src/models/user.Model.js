import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: { 
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,

    },
    cnic: {
        type: String,
        maxLength: 13,
        minLength: 13
    },
    roll: {
        type: String,
        enum: ['admin', 'user', ],
        default: 'user'
    }
    
     
});


const User = mongoose.model("User", userSchema);

export default User;