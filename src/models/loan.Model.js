const loanApplicationSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" },
  category: { 
    type: String, 
    required: true 
  },
  subcategory: { 
    type: String, 
    required: true 
  },
  amount: { 
    type: Number, 
    required: true 
  },
  guarantors: [
    {
      name: { type: String, required: true },
      email: { type: String, required: true },
      location: { type: String, required: true },
      cnic: { type: String, required: true },
    },
  ],
  address: { 
    type: String,
     required: true 
    },
  phoneNumber: { 
    type: String, 
    required: true 
  },
  city: { 
    type: String, 
    required: true 
  },
  country: { 
    type: String, 
    required: true 
  },
  tokenNumber: { 
    type: String, 
    default: null 
  },
  status: { 
    type: String, 
    default: "Pending"
   }, 
  createdAt: { 
    type: Date, 
    default: Date.now },
});

const LoanApplication = mongoose.model("LoanApplication", loanApplicationSchema);

export default LoanApplication