const mongoose = require("mongoose");

const PresentationHistorySchema = new mongoose.Schema({
  presentationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Presentation",
  },
  code: {
    type: String,
    required: true,
  },
  slidesRecord: [
    {
      slideId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Slide",
      },
      index: {
        type: Number,
      },
      question: {
        type: String,
      },
      type: {
        type: String,
      },
      results: [
        {
          option: String,
          count: Number,
        },
      ],
      members: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
  ],
  currentSlideIndex: {
    type: Number,
    default: 0,
  },
  onShow: {
    type: Boolean,
    default: false,
  },
  joinMembers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  chats: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      name: {
        type: String,
      },
      message: {
        type: String,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

PresentationHistorySchema.pre("save", function (next) {
    const presentationHistory = this;
    newSetJoinMembers = new Set(presentationHistory.joinMembers);
    presentationHistory.joinMembers = [...newSetJoinMembers];
    next();
});

module.exports = mongoose.model(
  "PresentationHistory",
  PresentationHistorySchema
);
