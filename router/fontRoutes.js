const express = require("express");
const router = express.Router();
const fontController = require("../controller/fontController");

router.post(
  "/upload-font",
  fontController.uploadFont,
  fontController.handleUpload
);
router.get("/get-all-fonts", fontController.getAllFonts);
router.get("/font/:filename", fontController.getFont);
router.get("/download-font/:filename", fontController.downloadFont);
router.delete("/delete-font/:filename", fontController.deleteFont);

module.exports = router;
