const mongoose = require("mongoose");

const CallHistorySchema = new mongoose.Schema({
  leadId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lead",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["Connected", "Not Connected"],
    required: true,
  },
  disposition: {
    type: String,
    enum: ["Interested", "Not Interested", "Admission Taken", null],
    default: null,
  },
  remarks: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("CallHistory", CallHistorySchema);
