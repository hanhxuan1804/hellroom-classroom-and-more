const mongoose = require("mongoose");

const GroupPostSchema = new mongoose.Schema({
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group",
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
    },
    file: {
        type: String,
    },
    comment: [
        {
            type: String,
        },
    ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model("GroupPost", GroupPostSchema);
