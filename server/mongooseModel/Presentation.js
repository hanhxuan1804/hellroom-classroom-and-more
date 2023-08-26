const mongoose = require("mongoose");

const PresentationSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ["private", "public"],
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group",
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    slides: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Slide",
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model("Presentation", PresentationSchema);

