const multer = require("multer");
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
     cb(null, "uploads/");
  },
    filename: (req, file, cb) => {
    //   console.log(file?.originalname.split('.')[0]);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file?.originalname.split(".")[0] +
        "_" +
        uniqueSuffix +
        path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "font/ttf") {
    cb(null, true);
  } else {
    cb(new Error("Only .ttf files are allowed!"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 },
});

module.exports = upload