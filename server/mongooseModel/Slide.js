const mongoose = require("mongoose");

const SlideSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ["multipleChoice", "shortAnswer", "trueFalse", "matching", "fillInBlank"],
    },
    question: {
        type: String,
        required: true,
    },
    options: [
        {
            type: String,
            required: true,
        },
    ],
    answer: {
        type: String,
        required: true,
    },
    points: {
        type: Number,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model("Slide", SlideSchema);
