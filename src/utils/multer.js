import multer from 'multer';

import path from "path";


const storage = multer.diskStorage({
    destination: function (req, file, cb,) {
     cb(null, "./public/temp")
   },
   filename: function (req, file, cb) {
     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
     cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
    }
 });

 const fileFilter = (req, file, cb,) => {
   const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
   if (allowedTypes.includes(file.mimetype)) {
       cb(null, true); // Accept file
   } else {
       cb(new Error("Invalid file type. Only JPEG, PNG, and JPG are allowed."), false); // Reject file
   }
 }
 
 export const upload = multer({
   storage: storage,
   fileFilter: fileFilter,
   limits: { fileSize: 2 * 1024 * 1024 }, // Limit file size to 2MB
});
