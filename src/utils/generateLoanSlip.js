import PDFDocument from "pdfkit";

export const generateLoanSlip = (res, loan, user) => {
  const doc = new PDFDocument({ size: "A4", margin: 50 });

  // HEADERS MUST BE SET BEFORE pipe()
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=loan-slip-${loan._id}.pdf`
  );

  doc.pipe(res);

  doc.fontSize(18).text("Loan Application Slip", { align: "center" });
  doc.moveDown();

  doc.fontSize(12);
  doc.text(`Name: ${user.name}`);
  doc.text(`CNIC: ${loan.cnic}`);
  doc.text(`Phone: ${loan.phoneNumber}`);
  doc.text(`Address: ${loan.address}`);
  doc.text(`City: ${loan.city}`);
  doc.text(`Country: ${loan.country}`);

  doc.moveDown();

  doc.text(`Loan Amount: Rs ${loan.loanAmount}`);
  doc.text(`Loan Period: ${loan.loanPeriod} Months`);
  doc.text(`Status: ${loan.status}`);

  doc.moveDown();
  doc.text(`Date: ${new Date().toLocaleDateString()}`);

  doc.end();
};
