import express from 'express';

import { adminOnly, protectRoute } from "../middlewares/auth.middleware.js"
import {createBasicLoan, updateBorrowerInfo, addDocuments} from "../controllers/loanApplication.controllers.js";

import { createLoanCategory, getLoanCategory, updateLoanCategory } from '../controllers/loanCategories.controller.js';
const router = express.Router()

router.post("/apply-loan", protectRoute, createBasicLoan);  
router.post("/loanCategory", protectRoute, adminOnly, createLoanCategory); 
router.get("/get-loanCategory", protectRoute, adminOnly, getLoanCategory);
router.put("/update-loanCategory/:id", protectRoute, adminOnly, updateLoanCategory);




export default router;