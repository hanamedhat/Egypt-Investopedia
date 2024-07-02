// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// // Ensure the uploads directory exists
// const uploadDir = '../public/uploads/';
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// // Set storage engine
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${req.params.userid}-${Date.now()}${path.extname(file.originalname)}`);
//   }
// });

// // Init upload
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 1000000 }, // 1MB limit
//   fileFilter: (req, file, cb) => {
//     checkFileType(file, cb);
//   }
// }).single('profileImage');

// // Check file type
// function checkFileType(file, cb) {
//   const filetypes = /jpeg|jpg|png|gif/;
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = filetypes.test(file.mimetype);

//   if (mimetype && extname) {
//     return cb(null, true);
//   } else {
//     cb('Error: Images Only!');
//   }
// }

// module.exports = upload;
