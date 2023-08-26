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
            option: String, count: Number,
        },
    ],
    presentation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Presentation",
    },
    history: [
        {
            presentationTime: {
                type:Number,
                required: true,
            },
            time: {
                type: Date,
                default: Date.now,
            },
            members: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },
            ],
            result: [
                {option: String, count: Number},
            ],
        },
    ],
    isDeleted: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model("Slide", SlideSchema);
