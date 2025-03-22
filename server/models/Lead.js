const mongoose = require("mongoose");

const LeadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  source: {
    type: String,
    required: true,
    enum: [
      "Website",
      "Referral",
      "Social Media",
      "Event",
      "Email Campaign",
      "Other",
    ],
  },
  callStatus: {
    type: String,
    enum: ["Connected", "Not Connected", "Pending"],
    default: "Pending",
  },
  leadStatus: {
    type: String,
    enum: ["New", "Interested", "Not Interested", "Admission Taken"],
    default: "New",
  },
  followUpDate: {
    type: Date,
    default: null,
  },
  lastContactedDate: {
    type: Date,
    default: null,
  },
  remarks: {
    type: String,
    default: "",
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Lead", LeadSchema);
