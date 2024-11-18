// const multer = require('multer');
// const path = require('path');

// // Storage Configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = path.join(__dirname, '../uploads');
//     cb(null, uploadPath); // Save files in the `uploads/` directory
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     cb(null, `${uniqueSuffix}-${file.originalname}`);
//   },
// });

// // File Validation
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true); // Accept the file
//   } else {
//     cb(new Error('Invalid file type. Only JPEG, PNG, and JPG files are allowed.'), false); // Reject the file
//   }
// };

// // Middleware Configuration
// const upload = multer({
//   storage,
//   limits: { fileSize: 2 * 1024 * 1024 }, // 2MB file size limit
//   fileFilter,
// });

// module.exports = upload;
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Define the uploads directory
const uploadsDir = path.resolve(__dirname, '../uploads');

// Ensure the directory exists
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('Uploads directory created:', uploadsDir);
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({ storage });
module.exports = upload;
