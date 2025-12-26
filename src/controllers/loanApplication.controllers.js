import { uploadCloudinary } from "../libs/cloudinary.js";
import LoanApplication from "../models/userloan.model.js";

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
  const { fullName, cnic, phoneNumber, address, city, country, statement, salarySheet } = req.body;
if (!statement.file || !salarySheet.file) {
      return res.status(400).json({ message: "statement/salarySheet is required" });
    }
    
    // Path to the uploaded file
    const localFilePath = req.file.path;

    // Upload to Cloudinary
    const cloudinaryResponse = await uploadCloudinary(localFilePath);

    if (!cloudinaryResponse) {
      return res.status(500).json({ message: "Failed to upload image to Cloudinary" });
    }
     // Delete local file after upload
     fs.unlinkSync(localFilePath);

  if (
    !fullName.trim() === "" || 
    !cnic.trim() === "" || 
    !phoneNumber.trim() === "" || 
    !address.trim() === "" || 
    !city.trim() === "" || 
    !country.trim() === "" 
   ) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }

  try {
    const updated = await LoanApplication.findByIdAndUpdate(
      req.params.id,
      {
        fullName: req.body.fullName,
        cnic: req.body.cnic,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        city: req.body.city,
        country: req.body.country,
        stepCompleted: 2
      },
      { new: true }
    );

    res.status(200).json({ message: "Borrower info updated", updated });

  } catch (error) {
    res.status(500).json({ message: "Error updating borrower info", error });
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


export const getAllApplications = async (req, res) => {
  try {
    const applications = await LoanApplication.find();
    res.status(200).json({ message: "Applications fetched successfully", applications });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching applications" });
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

