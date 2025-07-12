import multer from "multer";
import path from "path";
import fs from "fs";

// Function to create a reusable Multer instance
const createMulterInstance = ({
  uploadPath,
  fileSizeLimit = 5 * 1024 * 1024,
  allowedTypes,
  invalidTypeMessage,
}) => {
  // Ensure the upload directory exists
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  // Configure Multer storage
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${file.originalname}`;
      cb(null, uniqueSuffix);
    },
  });

  // File filter to allow only images
  const fileFilter = (req, file, cb) => {
    if (!allowedTypes) {
      // If no allowedTypes provided, allow all files
      return cb(null, true);
    }
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error(invalidTypeMessage));
    }
  };

  return multer({
    storage,
    fileFilter,
    limits: { fileSize: fileSizeLimit },
  });
};

export default createMulterInstance;
