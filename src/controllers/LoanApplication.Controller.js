import LoanApplication from "../models/LoanApplication";

export const submitLoanApplication = async (req, res) => {
  const { fullName, 
    email, 
    cnic, 
    category, 
    subcategory, 
    initialDeposit, 
    loanPeriod, 
    estimatedLoanBreakdown,
    statement,
    salarySheet,
    phone,
    address ,
    guarantors, } = req.body;
  try {
    const application = await LoanApplication.create(req.body);
    res.status(201).json({ message: "Loan application submitted", application });
  } catch (err) {
    res.status(500).json({ message: "Submission failed", error: err });
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

