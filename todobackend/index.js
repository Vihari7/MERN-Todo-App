const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const PORT = process.env.PORT || 8080;
const MONGOURL = process.env.MONGOURL;
const cors = require("cors");
dotenv.config()

app.use(express.json());
app.use(cors());

mongoose.connect(MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
  });
  
const User = mongoose.model("User", userSchema);

const taskSchema = new mongoose.Schema({
    text: String,
    status: String,
    priority: String,
    userId: mongoose.Schema.Types.ObjectId,
  });
 
const Task = mongoose.model("Task", taskSchema);

app.get("/", (req, res) => {
    res.send(" Backend is working!");
  });
  
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
