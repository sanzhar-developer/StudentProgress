const express = require("express");
const Subject = require("../models/Subject");
const Router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

Router.post("/", authMiddleware, async (req, res) => {
  const subject = new Subject({
    name: req.body.name,
    userId: req.user.userId
  });

  await subject.save();
  res.json(subject);
});

Router.get("/", authMiddleware, async (req, res) => {
  const subjects = await Subject.find({ userId: req.user.userId });
  res.json(subjects);
});

Router.delete("/:id", authMiddleware, async (req, res) => {
  const subject = await Subject.findOneAndDelete({
    _id: req.params.id,
    userId: req.user.userId
  });

  if (!subject) {
    return res.status(404).json({ message: "Subject not found" });
  }

  res.json({ message: "Subject deleted" });
});

Router.put("/:id", authMiddleware, async (req, res) => {
  const subject = await Subject.findOneAndUpdate(
    {
      _id: req.params.id,
      userId: req.user.userId
    },
    {
      name: req.body.name
    },
    {
      new: true
    }
  );

  if (!subject) {
    return res.status(404).json({ message: "Subject not found" });
  }

  res.json(subject);
});



module.exports = Router;