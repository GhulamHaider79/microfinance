import LoanApplication from "../models/userloan.model.js";

export const createBasicLoan = async (req, res) => {
  const { category, subcategory, amount, loanPeriod, initialDeposit } = req.body;

  if (!category || !subcategory || !amount || !loanPeriod || !initialDeposit) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }
  try {
    const application = await LoanApplication.create({
      category,
      subcategory,
      amount,
      loanPeriod,
      initialDeposit,
    });

    res.status(201).json({
      message: "Basic loan application created",
      application: application,
      applicationId: application._id,
    });

  } catch (error) {
    res.status(500).json({ message: "Error creating application", error });
  }
};

export const updateBorrowerInfo = async (req, res) => {
  const { fullName, cnic, phoneNumber, address, city, country } = req.body;

  if (!fullName || !cnic || !phoneNumber || !address || !city || !country) {
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

