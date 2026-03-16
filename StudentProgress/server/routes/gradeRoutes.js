const express = require("express");
const Grade = require("../models/Grade");
const Subject = require("../models/Subject");
const authMiddleware = require("../middleware/authMiddleware");

const Router = express.Router();

Router.post("/", authMiddleware, async (req, res) => {
  const { subjectId, value } = req.body;

  const subject = await Subject.findOne({
    _id: subjectId,
    userId: req.user.userId
  });

  if (!subject) {
    return res.status(403).json({ message: "Not your subject" });
  }

  const grade = new Grade({
    subjectId,
    value
  });

  await grade.save();
  res.json(grade);
});

Router.get("/", authMiddleware, async (req, res) => {
  const subjects = await Subject.find({ userId: req.user.userId });

  const subjectIds = subjects.map((s) => s._id);

  const grades = await Grade
    .find({ subjectId: { $in: subjectIds } })
    .populate("subjectId");

  res.json(grades);
});

Router.get("/:subjectId", authMiddleware, async (req, res) => {
  const grades = await Grade.find({ subjectId: req.params.subjectId });
  res.json(grades);
});

module.exports = Router;