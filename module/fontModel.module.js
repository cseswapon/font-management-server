const mongoose = require("mongoose");

const fontSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true },
    uploadDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Font = mongoose.model("Font", fontSchema);

module.exports = Font;
