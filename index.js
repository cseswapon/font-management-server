const express = require('express');
const app = express();
const path = require('path')
const cors = require('cors');
const PORT = process.env.PORT || 8000;
const mongoose = require('mongoose');
const fontRoutes = require('./router/fontRoutes');
const groupRoutes = require('./router/groupRoutes');
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use("/api", fontRoutes);
app.use("/api", groupRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/",async (req, res) => { 
    res.status(200).send({message:"OK"})
})

app.get("*", (req, res) => {
  res.status(200).send({message:"Not Found"})
})

const DATABASE_URI =
  process.env.DATABASE_URI 
mongoose
  .connect(DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    writeConcern: {
      w: "majority",
      wtimeout: 5000,
    },
  })
  .then(() => {
    console.log(`Database Connected Successfully`);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err.message));