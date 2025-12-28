import express from 'express';

import { adminOnly, protectRoute } from "../middlewares/userAuth.middlewares.js"
import {createBasicLoan, updateBorrowerInfo, addDocuments, guarantorDetails, getMyLoanApplications} from "../controllers/loanApplication.controllers.js";

import { createLoanCategory, getLoanCategory, updateLoanCategory } from '../controllers/loanCategoey.controllers.js';
const router = express.Router()

router.post("/apply-loan", protectRoute, createBasicLoan);
router.get("/my-loans", protectRoute, getMyLoanApplications);
router.post("/guarantor", protectRoute, guarantorDetails);
router.put("/borrower-info", protectRoute, updateBorrowerInfo);  
router.put("/add-documents", protectRoute, addDocuments);
router.post("/loanCategory", protectRoute, adminOnly, createLoanCategory); 
router.get("/get-loanCategory", protectRoute, adminOnly, getLoanCategory);
router.put("/update-loanCategory/:id", protectRoute, adminOnly, updateLoanCategory);




export default router;