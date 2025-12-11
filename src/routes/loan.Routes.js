import express from 'express';

import { adminOnly, protectRoute } from "../middlewares/auth.Middleware.js"
import {createBasicLoan, updateBorrowerInfo, addDocuments} from "../controllers/LoanApplication.Controller.js";

import { createLoanCategory, getLoanCategory, updateLoanCategory } from '../controllers/loanCategories.Controller.js';
const router = express.Router()

router.post("/apply-loan", protectRoute, createBasicLoan);  
router.post("/loanCategory", protectRoute, adminOnly, createLoanCategory); 
router.get("/get-loanCategory", protectRoute, adminOnly, getLoanCategory);
router.put("/update-loanCategory/:id", protectRoute, adminOnly, updateLoanCategory);




export default router;