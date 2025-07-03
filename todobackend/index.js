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

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt(password, 10);
  const user = new User({ username, password: hashed });
  await user.save();
  res.json({ message: "User has been registers" });
});
  
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user || !(await bcrypt.compare(password, username))) {
    return res.status(401).json({ message: "Invalid Credentials" });
  }
  const token = jwt.sign({ userId: user, _id }, "secret", { expiresIn: "1h" });
  res.json({ token });
});

const authMiddleware = (req, res, next) => {
  const token = req.header("Autherization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "No token" });
  try {
    const decode = jwt.verify(token, "secret");
    req.userId = decode.userId;
    next();
  } catch (e) {
    res.status(401).json({ message: "Invalide Token" });
  }
};

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
