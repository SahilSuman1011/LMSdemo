const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { protect, admin } = require("../middleware/authMiddleware");

// Get dashboard statistics
router.get("/dashboard-stats", protect, adminController.getDashboardStats);

// Get team performance
router.get("/team-performance", protect, adminController.getTeamPerformance);

// Get unassigned leads
router.get("/unassigned-leads", protect, adminController.getUnassignedLeads);

// Get lead source distribution
router.get("/lead-sources", protect, adminController.getLeadSourceDistribution);

// Get conversion by source
router.get(
  "/conversion-by-source",
  protect,
  adminController.getConversionBySource,
);

// Get monthly lead and conversion trends
router.get("/monthly-trends", protect, adminController.getMonthlyTrends);

module.exports = router;
