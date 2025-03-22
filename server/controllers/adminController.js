const Lead = require("../models/Lead");
const User = require("../models/User");
const CallHistory = require("../models/CallHistory");

// Get dashboard statistics
exports.getDashboardStats = async (req, res) => {
  try {
    // Only admin can access admin dashboard
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Not authorized to access admin dashboard" });
    }

    // Get total leads count
    const totalLeads = await Lead.countDocuments();

    // Get conversion count and rate
    const convertedLeads = await Lead.countDocuments({
      leadStatus: "Admission Taken",
    });
    const conversionRate =
      totalLeads > 0 ? Math.round((convertedLeads / totalLeads) * 100) : 0;

    // Get average response time (time between lead creation and first contact)
    const leads = await Lead.find({ lastContactedDate: { $ne: null } });
    let totalResponseTime = 0;
    let responseTimes = 0;

    for (const lead of leads) {
      if (lead.lastContactedDate && lead.createdAt) {
        const responseTime = lead.lastContactedDate - lead.createdAt;
        totalResponseTime += responseTime;
        responseTimes++;
      }
    }

    const avgResponseTime =
      responseTimes > 0
        ? Math.round(totalResponseTime / responseTimes / (1000 * 60 * 60)) // in hours
        : 0;

    res.json({
      totalLeads,
      conversions: convertedLeads,
      conversionRate: `${conversionRate}%`,
      avgResponseTime: `${avgResponseTime}h`,
    });
  } catch (error) {
    console.error("Error fetching admin dashboard stats:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get team performance
exports.getTeamPerformance = async (req, res) => {
  try {
    // Only admin can access team performance
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Not authorized to access team performance" });
    }

    const users = await User.find().select("-password");

    const teamPerformance = await Promise.all(
      users.map(async (user) => {
        const leadsCount = await Lead.countDocuments({ assignedTo: user._id });
        const convertedCount = await Lead.countDocuments({
          assignedTo: user._id,
          leadStatus: "Admission Taken",
        });

        return {
          id: user._id,
          name: user.name,
          email: user.email,
          leads: leadsCount,
          conversions: convertedCount,
          conversionRate:
            leadsCount > 0
              ? ((convertedCount / leadsCount) * 100).toFixed(1)
              : "0.0",
        };
      }),
    );

    res.json(teamPerformance);
  } catch (error) {
    console.error("Error fetching team performance:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get unassigned leads
exports.getUnassignedLeads = async (req, res) => {
  try {
    // Only admin can view unassigned leads
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Not authorized to view unassigned leads" });
    }

    const leads = await Lead.find({ assignedTo: null }).sort({ createdAt: -1 });

    res.json(leads);
  } catch (error) {
    console.error("Error fetching unassigned leads:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get lead source distribution
exports.getLeadSourceDistribution = async (req, res) => {
  try {
    // Only admin can access this data
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Not authorized to access this data" });
    }

    const sources = await Lead.aggregate([
      { $group: { _id: "$source", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    res.json(
      sources.map((source) => ({
        source: source._id,
        count: source.count,
      })),
    );
  } catch (error) {
    console.error("Error fetching lead source distribution:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get conversion by source
exports.getConversionBySource = async (req, res) => {
  try {
    // Only admin can access this data
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Not authorized to access this data" });
    }

    const sources = await Lead.aggregate([
      {
        $group: {
          _id: "$source",
          total: { $sum: 1 },
          converted: {
            $sum: {
              $cond: [{ $eq: ["$leadStatus", "Admission Taken"] }, 1, 0],
            },
          },
        },
      },
      { $sort: { total: -1 } },
    ]);

    res.json(
      sources.map((source) => ({
        source: source._id,
        total: source.total,
        converted: source.converted,
        rate:
          source.total > 0
            ? ((source.converted / source.total) * 100).toFixed(1)
            : "0.0",
      })),
    );
  } catch (error) {
    console.error("Error fetching conversion by source:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get monthly lead and conversion trends
exports.getMonthlyTrends = async (req, res) => {
  try {
    // Only admin can access this data
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Not authorized to access this data" });
    }

    // Get data for the last 6 months
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    sixMonthsAgo.setDate(1);
    sixMonthsAgo.setHours(0, 0, 0, 0);

    const leads = await Lead.find({
      createdAt: { $gte: sixMonthsAgo },
    });

    // Group by month
    const monthlyData = {};

    leads.forEach((lead) => {
      const date = new Date(lead.createdAt);
      const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;

      if (!monthlyData[monthYear]) {
        monthlyData[monthYear] = {
          month: monthYear,
          leads: 0,
          conversions: 0,
        };
      }

      monthlyData[monthYear].leads++;

      if (lead.leadStatus === "Admission Taken") {
        monthlyData[monthYear].conversions++;
      }
    });

    // Convert to array and sort by month
    const trends = Object.values(monthlyData).sort((a, b) => {
      return a.month.localeCompare(b.month);
    });

    res.json(trends);
  } catch (error) {
    console.error("Error fetching monthly trends:", error);
    res.status(500).json({ message: "Server error" });
  }
};
