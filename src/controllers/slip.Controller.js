import QRCode from "qrcode";
import Slip from "../models/Slip.js"; 

exports.generateSlip = async (req, res) => {
  try {
    const token = `TOKEN-${Date.now()}`; 
    const qrCode = await QRCode.toDataURL(token); 

    const appointmentDetails = {
      date: "2025-01-30",
      time: "10:00 AM",
      location: "Head Office",
    };

    const slip = new Slip({
      token,
      qrCode,
      appointmentDetails,
    });

    await slip.save(); 

    res.status(200).json({
      message: "Slip generated successfully",
      slip: {
        token,
        qrCode,
        appointmentDetails,
      },
    });
  } catch (error) {
    console.error("Error generating slip:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
