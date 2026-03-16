const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
    name: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    grades: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Grade"
    }]
})

module.exports = mongoose.model("Subject", subjectSchema);

