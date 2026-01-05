import express from 'express';

import { adminOnly, protectRoute } from "../middlewares/userAuth.middlewares.js"
import {createBasicLoan, updateBorrowerInfo, addDocuments, guarantorDetails, getMyLoanApplications, downloadLoanSlip, deleteLoanApplication} from "../controllers/loanApplication.controllers.js";

import { createLoanCategory, getLoanCategory, updateLoanCategory } from '../controllers/loanCategoey.controllers.js';
import { upload } from "../utils/multer.js"
const router = express.Router()

router.post("/apply-loan", protectRoute, createBasicLoan);
router.get("/my-loans", protectRoute, getMyLoanApplications);
router.post("/guarantor", protectRoute, guarantorDetails); 
router.put("/add-documents", protectRoute, addDocuments);
router.post("/loanCategory", protectRoute, adminOnly, createLoanCategory); 
router.get("/get-loanCategory",  getLoanCategory);
router.put("/update-loanCategory/:id", protectRoute, adminOnly, updateLoanCategory);

router.put("/borrower-info", protectRoute,  upload.fields([
    { name: "statement", maxCount: 1 },
    { name: "salarySheet", maxCount: 1 },
  ]), 
  updateBorrowerInfo); 

//  "/borrower-info/:id",


router.get(
  "/download-slip/:id",
  protectRoute,
  downloadLoanSlip
);

router.delete("/delete-loan/:id", protectRoute, deleteLoanApplication)



export default router;