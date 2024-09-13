const path = require("path");
const fs = require('fs');
const upload = require("../utils/fontUtils");

exports.uploadFont = upload.single("fontFile");

exports.handleUpload = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Please upload a valid .ttf file" });
  }
  res.status(200).json({  
    message: "Font uploaded successfully!",
    file: req.file,
  });
};

exports.downloadFont = (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "../uploads", filename);

  res.download(filePath, (err) => {
    if (err) {
      console.error("Error downloading the file:", err);
      res.status(404).send({ error: "Font not found" });
    }
  });
};

exports.getAllFonts = (req, res) => {
  const uploadsDir = path.join(__dirname, "../uploads");

  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Unable to read upload directory" });
    }

    res.status(200).json({
      message: "Files retrieved successfully",
      files: files,
    });
  });
};

exports.getFont = (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "../uploads", filename);
  // console.log(req.params,filePath);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "Font not found" });
  }
  res.status(200).json({
    message: "Font retrieved successfully!",
    file: filename,
  });
};

exports.deleteFont = (req, res) => { 
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "../uploads", filename);

  fs.unlink(filePath, (err, data) => {
    if (err) {
      console.error("Error deleting the file:", err);
      return res.status(404).json({ error: "Font not found" });
    }
    res.status(200).json({ message: "Font deleted successfully!" });
  })
}