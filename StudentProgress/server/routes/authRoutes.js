const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
const User = require("../models/User");

Router.post("/register", async (req, res) => {
  const { name, email, password} = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Все поля должны быть заполнены"});
  }

  const existingUser = await User.findOne({ email })

  if (existingUser) {
    return res.status(400).json({ error: "Такой пользователь уже существует" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    password: hashedPassword
  });

  await user.save();

  res.json({ message: "Вы успешно зарегистрировались" })
})

Router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email })

  if (!user) {
    return res.status(400).json({ error: "Неправильный логин или пароль" });
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    return res.status(400).json({ error: "Неправильный логин или пароль" });
  }

  const token = jwt.sign(
    { userId: user._id },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token })
});

module.exports = Router;