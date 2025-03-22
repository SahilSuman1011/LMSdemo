const express = require("express");
const router = express.Router();
const leadController = require("../controllers/leadController");
const { protect } = require("../middleware/authMiddleware");

// Get all leads with filtering
router.get("/", protect, leadController.getLeads);

// Get today's follow-ups
router.get("/today-followups", protect, leadController.getTodayFollowUps);

// Get lead statistics
router.get("/stats", protect, leadController.getLeadStats);

// Get a single lead by ID
router.get("/:id", protect, leadController.getLeadById);

// Create a new lead
router.post("/", protect, leadController.createLead);

// Update lead information
router.put("/:id", protect, leadController.updateLead);

// Record a call disposition
router.post("/:id/call", protect, leadController.recordCallDisposition);

// Delete a lead (admin only)
router.delete("/:id", protect, leadController.deleteLead);

module.exports = router;
