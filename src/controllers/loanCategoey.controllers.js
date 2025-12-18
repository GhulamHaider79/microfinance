import LoanCategory from "../models/loanCategories.js";

export const createLoanCategory = async (req, res) => {
  const { categoryName, subcategories, maxLoan, loanPeriod } = req.body;    
    if (!categoryName || !maxLoan || !loanPeriod || !subcategories) {

        res.status(400).json({ message: "All fieled are required" });
    }

    try{
   const newCategory = new LoanCategory({
        categoryName,
        subcategories,
        maxLoan,
        loanPeriod
   });

   if(newCategory){
  console.log("newCategory", newCategory);
       await newCategory.save();
       return res.status(201).json({
        message: "Loan Category created successfully",
        category: {
          _id: newCategory._id,
          categoryName: newCategory.categoryName,
          subcategories: newCategory.subcategories,
          maxLoan: newCategory.maxLoan,
          loanPeriod: newCategory.loanPeriod   
   } 
        });
    }else{
       return res.status(400).json({ message: "Error creating Loan Category" });
    };

   
    }  catch(error){
      return  res.status(500).json({ message: error.message });
    }
};


export const getLoanCategory = async (req, res) => {
   try {
      const loanCategory  = await LoanCategory.find(); // Fetch all users
      res.status(200).json({
        success: true,
        data: loanCategory ,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch users",
        error: error.message,
      });
    }
}



  export const updateLoanCategory = async (req, res) => {
  const { id } = req.params; // category ID from URL
  const { loanPeriod, maxLoan, subcategories, categoryName } = req.body;

  try {
    // Find the category by ID and update only the provided fields
    const updatedCategory = await LoanCategory.findByIdAndUpdate(
      id,
      {
        $set: {
          ...(loanPeriod && { loanPeriod }),
          ...(maxLoan !== undefined && { maxLoan }),
          ...(subcategories && { subcategories }),
          ...(categoryName && { categoryName }),
        }
      },
      { new: true } // return the updated document
    );

    if (!updatedCategory) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    res.status(200).json({
      success: true,
      message: "Loan category updated successfully",
      data: updatedCategory
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update loan category",
      error: error.message
    });
  }
};



