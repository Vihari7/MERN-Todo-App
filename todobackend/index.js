const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const PORT = process.env.PORT || 8080;
const MONGOURL = process.env.MONGOURL;
const cors = require("cors");

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
    res.send(" Backend is working!");
  });
  
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
