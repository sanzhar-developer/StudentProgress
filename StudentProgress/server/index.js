const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("./middleware/authMiddleware");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const gradeRoutes = require("./routes/gradeRoutes");
const User = require("./models/User");
const MongoURI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const app = express();
app.use(cors());


app.use(express.json());

mongoose.connect(MongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/subject", subjectRoutes);
app.use("/grade", gradeRoutes);

app.get("/profile", authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.userId);
  res.json(user);
});
  
app.get("/", (req, res) => {
    res.send("API is working");
})




app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))