const mongoose = require("mongoose");

const gradeSchema = new mongoose.Schema({
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject"
    },
    value: Number
});

module.exports = mongoose.model("Grade", gradeSchema);