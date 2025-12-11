import mongoose from "mongoose";


const guarantorSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  location: { type: String },
  cnic: { type: String }
});


const loanApplicationSchema = new mongoose.Schema({
  // Step 1: Loan Details
userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" }, 
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  amount: { type: String, required: true },
  loanPeriod: { type: String, required: true },
   initialDeposit: { type: String, equired: true  },

  // Step 2: Borrower Information
  fullName: { type: String },
  cnic: { type: String },
  phoneNumber: { type: String },
  address: { type: String },
  city: { type: String },
  country: { type: String },

  // Step 3: Guarantors
  guarantors: [guarantorSchema],

  // Step 4: Additional fields (optional until final)
 
  statement: { type: String },
  salarySheet: { type: String },

  // Admin Section
  tokenNumber: { type: String, default: null },
  status: { type: String, default: "Pending" }, // Pending, Approved, Rejected

  createdAt: { type: Date, default: Date.now }






});

const LoanApplication = mongoose.model("LoanApplication", loanApplicationSchema);

export default LoanApplication