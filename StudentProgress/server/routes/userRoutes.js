const express = require("express");
const User = require("../models/User");
const Router = express.Router();

Router.post("/", async (req, res) => {
    const user = new User(req.body);
    await user.save()
    res.json(user);
})

Router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

Router.delete("/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
});

module.exports = Router;