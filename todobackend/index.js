const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const PORT = process.env.PORT || 8080;
const MONGOURL = process.env.MONGOURL;
const cors = require("cors");

app.use(express.json());

const allowedOrigins = [
  'https://mern-todo-app-lilac.vercel.app',  // Vercel domain
  'https://mern-todo-5yavt1wv3-vihari7s-projects.vercel.app',
  'http://localhost:3000'  // For local testing 
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.options("*", cors()); // Respond to preflight requests

console.log("MONGOURL from env:", process.env.MONGOURL);

mongoose.connect(MONGOURL);

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

// signup
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashed });
  await user.save();
  res.json({ message: "User Registered" });
  }catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid Credentials" });
  }
  const token = jwt.sign({ userId: user._id }, "secret", { expiresIn: "1h" });
  res.json({ token });
});

//create authMiddleware for route protection
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "No token" });
  try {
    const decode = jwt.verify(token, "secret");
    req.userId = decode.userId;
    next();
  } catch (e) {
    res.status(401).json({ message: "Invalide Token" });
  }
};

// Get task request
app.get("/tasks", authMiddleware, async (req, res) => {
  const tasks = await Task.find({ userId: req.userId });
  res.json(tasks);
});

// Post task request
app.post("/tasks", authMiddleware, async (req, res) => {
  const task = new Task({ ...req.body, userId: req.userId });
  await task.save();
  res.json(task);
});

// Delete task request
app.delete("/tasks/:id", authMiddleware, async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId });
  res.json({ message: "Task deleted" });
});

// Update task status
app.patch("/tasks/:id/status", authMiddleware, async (req, res) => {
  const { status } = req.body;
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    { status },
    { new: true }
  );
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json(task);
});

// Update task priority
app.patch("/tasks/:id/priority", authMiddleware, async (req, res) => {
  const { priority } = req.body;
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    { priority },
    { new: true }
  );
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json(task);
});


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
