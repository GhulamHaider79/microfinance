import mongoose from "mongoose";

// Schema for a single loan category
const loanCategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true
  },
  subcategories: {
    type: [String], // array of strings
    default: []
  },
  maxLoan: {
    type: Number,
    required: true
  },
  loanPeriod: {
    type: String,
    required: true
  }
});

// Model
const LoanCategory = mongoose.model("loanCategories", loanCategorySchema);

export default LoanCategory;
