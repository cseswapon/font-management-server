const path = require("path");
const fs = require('fs');
const upload = require("../middlewares/fontUtils");
const Font = require("../module/fontModel.module");

exports.uploadFont = upload.single("fontFile");

exports.handleUpload = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Please upload a valid .ttf file" });
  }
  try {
    const font = new Font({ filename: req.file.filename });
    await font.save();
    res.status(200).json({
      message: "Font uploaded successfully!",
      file: req.file,
    });
  } catch (err) {
    res.status(500).json({ error: "Error saving font metadata" });
  }
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

exports.getAllFonts = async (req, res) => {
  try {
    const fonts = await Font.find();
    res.status(200).json({
      message: "Fonts retrieved successfully",
      fonts: fonts.map((font) => font.filename),
    });
  } catch (err) {
    res.status(500).json({ error: "Unable to retrieve fonts" });
  }
};

exports.getFont = async (req, res) => {
  const filename = req.params.filename;

  try {
    const font = await Font.findOne({ filename });
    if (!font) {
      return res.status(404).json({ error: "Font not found" });
    }
    res.status(200).json({
      message: "Font retrieved successfully!",
      file: filename,
    });
  } catch (err) {
    res.status(500).json({ error: "Error retrieving font" });
  }
};

exports.deleteFont = async (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "../uploads", filename);

  try {
    const font = await Font.findOneAndDelete({ filename });
    if (!font) {
      return res.status(404).json({ error: "Font not found" });
    }

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting the file:", err);
        return res.status(500).json({ error: "Error deleting font file" });
      }
      res.status(200).json({ message: "Font deleted successfully!" });
    });
  } catch (err) {
    res.status(500).json({ error: "Error deleting font metadata" });
  }
};