const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  title: {
    type: String,
  },
  fontsGroup: [
    {
      fontName: {
        type: String,
      },
      selectFond: String,
      fontSize: String,
      priceCharge: String,
    },
  ],
});

const Group = mongoose.model("Group", Schema);

module.exports = Group;
