import mongoose from "mongoose";

const slipSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    token: String,
    qrCode: String,
    appointmentDetails: { 
        date: String, 
        time: String, 
        location: String 
    },
  });
  
  const Slip = mongoose.model("Slip", slipSchema);


  export default Slip
  