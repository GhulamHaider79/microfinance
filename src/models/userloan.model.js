import mongoose from "mongoose";

const guarantorSchema = new mongoose.Schema({
  name: String,
  email: String,
  location: String,
  country: String,
  city: String,
  cnic: String,
});

const loanApplicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    category: { type: String, required: true },
    subcategory: { type: String, required: true },

    loanAmount: { type: Number, required: true },
    loanPeriod: { type: Number, required: true },
    initialDeposit: { type: Number, required: true },

    fullName: String,
    cnic: String,
    phoneNumber: String,
    address: String,
    city: String,
    country: String,

    guarantors: [guarantorSchema],

    statement: String,
    salarySheet: String,

    tokenNumber: { type: String, default: null },
    stepCompleted: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("LoanApplication", loanApplicationSchema);
