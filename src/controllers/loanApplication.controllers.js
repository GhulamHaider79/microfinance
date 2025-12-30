import { uploadCloudinary } from "../libs/cloudinary.js";
import LoanApplication from "../models/userloan.model.js";
import { generateLoanSlip } from "../utils/generateLoanSlip.js";


export const createBasicLoan = async (req, res) => {
  const { category, subcategory, loanAmount, loanPeriod, initialDeposit } = req.body;
  if (
    !category ||
    !subcategory ||
    loanAmount == null ||
    loanPeriod == null ||
    initialDeposit == null
  ) {
    return res.status(400).json({ message: "All fields are required" });
  };

  try {
    // 🔒 BLOCK multiple pending loans
    const existingLoan = await LoanApplication.findOne({
      userId: req.user._id,
      status: "Pending",
    });

    if (existingLoan) {
      return res.status(400).json({
        success: false,
        message: "You already have a pending loan application.",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  try {
    const newLoan = new LoanApplication({
      userId: req.user._id,
      category,
      subcategory,
      loanAmount,
      loanPeriod,
      initialDeposit,
      stepCompleted: 1
    });

    if (newLoan) {

      await newLoan.save();
      return res.status(201).json({
        success: true,
        message: "Loan application submitted successfully",
        data: newLoan,
      });
    } else {
      return res.status(400).json({ message: "Error creating Loan Category" });
    };


  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



export const updateBorrowerInfo = async (req, res) => {
  try {
    const { fullName, cnic, phoneNumber, address, city, country } = req.body;

    // ✅ Text field validation
    if (
      !fullName?.trim() ||
      !cnic?.trim() ||
      !phoneNumber?.trim() ||
      !address?.trim() ||
      !city?.trim() ||
      !country?.trim()
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ File validation
    if (!req.files?.statement || !req.files?.salarySheet) {
      return res.status(400).json({
        message: "Bank statement and salary sheet are required",
      });
    }

    // ✅ Upload files to Cloudinary
    const statementUpload = await uploadCloudinary(
      req.files.statement[0].path
    );

    const salaryUpload = await uploadCloudinary(
      req.files.salarySheet[0].path
    );

    if (!statementUpload || !salaryUpload) {
      return res.status(500).json({ message: "File upload failed" });
    }

    // ✅ Update DB
    const updated = await LoanApplication.findByIdAndUpdate(
      req.user._id,
      {
        fullName,
        cnic,
        phoneNumber,
        address,
        city,
        country,
        statementUrl: statementUpload.secure_url,
        salarySheetUrl: salaryUpload.secure_url,
        stepCompleted: 2,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Borrower info updated successfully",
      updated,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error updating borrower info",
      error: error.message,
    });
  }
};



export const guarantorDetails = async (req, res) => {
  const { name, cnic, address, city, country } = req.body;

  if (
    !name.trim() === "" ||
    !cnic.trim() === "" ||
    !address.trim() === "" ||
    !city.trim() === "" ||
    !country.trim() === "") {
    res.status(400).json({ message: "All fields are required" });
    return;
  }
  try {
    const loanGuarantor = await LoanApplication.findOneAndUpdate(
      {
        userId: req.user._id,
        status: "Pending",
      },
      {
        name,
        cnic,
        address,
        city,
        country,
        stepCompleted: 2
      },
      { new: true }
    );

    if (!loanGuarantor) {
      return res.status(404).json({
        message: "No pending loan found for this user",
      });
    }

    res.status(200).json({
      success: true,
      message: "Guarantor info updated",
      data: loanGuarantor,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating borrower info", error });
  }
};

export const addDocuments = async (req, res) => {
  try {
    const updated = await LoanApplication.findByIdAndUpdate(
      req.params.id,
      {
        statement: req.body.statement,
        salarySheet: req.body.salarySheet,
        initialDeposit: req.body.initialDeposit,
        stepCompleted: 4
      },
      { new: true }
    );

    res.status(200).json({ message: "Documents added", updated });

  } catch (error) {
    res.status(500).json({ message: "Error adding documents", error });
  }
};


export const getMyLoanApplications = async (req, res) => {
  try {
    const userId = req.user.id; 

    const loans = await LoanApplication.find({ userId: req.user._id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: loans.length,
      loans,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch loan applications",
    });
  }
};


export const filterApplications = async (req, res) => {
  const { city, country } = req.query;
  try {
    const filters = {};
    if (city) filters.city = city;
    if (country) filters.country = country;

    const filteredApplications = await LoanApplication.find(filters);
    res.status(200).json({ message: "Filtered applications fetched successfully", filteredApplications });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error filtering applications" });
  }
};

export const addTokenNumber = async (req, res) => {
  const { applicationId, tokenNumber } = req.body;
  try {
    const application = await LoanApplication.findByIdAndUpdate(
      applicationId,
      { tokenNumber },
      { new: true }
    );
    if (!application) return res.status(404).json({ message: "Application not found" });
    res.status(200).json({ message: "Token number added successfully", application });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating application" });
  }
};



export const downloadLoanSlip = async (req, res) => {
  try {
    const loan = await LoanApplication.findById(req.params.id);
    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    // Security check
    if (loan.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    generateLoanSlip(res, loan, req.user);
  } catch (error) {
    res.status(500).json({ message: "PDF generation failed" });
  }
};
