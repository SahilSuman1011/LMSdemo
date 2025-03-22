const Lead = require("../models/Lead");
const CallHistory = require("../models/CallHistory");

// Get all leads (with filtering)
exports.getLeads = async (req, res) => {
  try {
    const { search, callStatus, leadStatus, followUpDate, assignedTo } =
      req.query;
    const query = {};

    // Filter by search term
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    // Filter by call status
    if (callStatus) {
      query.callStatus = callStatus;
    }

    // Filter by lead status
    if (leadStatus) {
      query.leadStatus = leadStatus;
    }

    // Filter by follow-up date
    if (followUpDate) {
      const date = new Date(followUpDate);
      const nextDay = new Date(date);
      nextDay.setDate(date.getDate() + 1);

      query.followUpDate = {
        $gte: date,
        $lt: nextDay,
      };
    }

    // Filter by assigned user
    if (assignedTo) {
      query.assignedTo = assignedTo;
    } else if (req.user.role !== "admin") {
      // If not admin, only show leads assigned to the user
      query.assignedTo = req.user.id;
    }

    const leads = await Lead.find(query)
      .populate("assignedTo", "name email")
      .sort({ createdAt: -1 });

    res.json(leads);
  } catch (error) {
    console.error("Error fetching leads:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get today's follow-ups
exports.getTodayFollowUps = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const query = {
      followUpDate: {
        $gte: today,
        $lt: tomorrow,
      },
    };

    // If not admin, only show leads assigned to the user
    if (req.user.role !== "admin") {
      query.assignedTo = req.user.id;
    }

    const leads = await Lead.find(query)
      .populate("assignedTo", "name email")
      .sort({ followUpDate: 1 });

    res.json(leads);
  } catch (error) {
    console.error("Error fetching today's follow-ups:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a single lead by ID
exports.getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id).populate(
      "assignedTo",
      "name email",
    );

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    // Check if user has access to this lead
    if (
      req.user.role !== "admin" &&
      lead.assignedTo &&
      lead.assignedTo._id.toString() !== req.user.id
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to access this lead" });
    }

    // Get call history for this lead
    const callHistory = await CallHistory.find({ leadId: lead._id })
      .populate("userId", "name")
      .sort({ date: -1 });

    res.json({ lead, callHistory });
  } catch (error) {
    console.error("Error fetching lead:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Create a new lead
exports.createLead = async (req, res) => {
  try {
    const { name, phone, email, source } = req.body;

    // Create new lead
    const lead = new Lead({
      name,
      phone,
      email,
      source,
      // If user is admin and assignedTo is provided, use it
      // Otherwise assign to current user
      assignedTo:
        req.user.role === "admin" && req.body.assignedTo
          ? req.body.assignedTo
          : req.user.id,
    });

    await lead.save();
    res.status(201).json(lead);
  } catch (error) {
    console.error("Error creating lead:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update lead information
exports.updateLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    // Check if user has access to update this lead
    if (
      req.user.role !== "admin" &&
      lead.assignedTo &&
      lead.assignedTo.toString() !== req.user.id
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this lead" });
    }

    // Update fields
    const updatedFields = req.body;
    updatedFields.updatedAt = Date.now();

    // Only admin can reassign leads
    if (req.user.role !== "admin") {
      delete updatedFields.assignedTo;
    }

    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id,
      { $set: updatedFields },
      { new: true },
    ).populate("assignedTo", "name email");

    res.json(updatedLead);
  } catch (error) {
    console.error("Error updating lead:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Record a call disposition
exports.recordCallDisposition = async (req, res) => {
  try {
    const { callStatus, leadProgress, followUpDate, remarks } = req.body;
    const leadId = req.params.id;

    const lead = await Lead.findById(leadId);

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    // Check if user has access to this lead
    if (
      req.user.role !== "admin" &&
      lead.assignedTo &&
      lead.assignedTo.toString() !== req.user.id
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this lead" });
    }

    // Create call history record
    const callHistory = new CallHistory({
      leadId,
      userId: req.user.id,
      status: callStatus === "connected" ? "Connected" : "Not Connected",
      disposition:
        leadProgress === "interested"
          ? "Interested"
          : leadProgress === "not_interested"
            ? "Not Interested"
            : leadProgress === "admission_taken"
              ? "Admission Taken"
              : null,
      remarks,
    });

    await callHistory.save();

    // Update lead information
    const leadUpdate = {
      callStatus: callStatus === "connected" ? "Connected" : "Not Connected",
      leadStatus:
        leadProgress === "interested"
          ? "Interested"
          : leadProgress === "not_interested"
            ? "Not Interested"
            : leadProgress === "admission_taken"
              ? "Admission Taken"
              : lead.leadStatus,
      lastContactedDate: Date.now(),
      remarks,
      updatedAt: Date.now(),
    };

    if (followUpDate) {
      leadUpdate.followUpDate = followUpDate;
    }

    const updatedLead = await Lead.findByIdAndUpdate(
      leadId,
      { $set: leadUpdate },
      { new: true },
    ).populate("assignedTo", "name email");

    res.json({ lead: updatedLead, callHistory });
  } catch (error) {
    console.error("Error recording call disposition:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a lead (admin only)
exports.deleteLead = async (req, res) => {
  try {
    // Only admin can delete leads
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Not authorized to delete leads" });
    }

    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    // Delete lead and associated call history
    await Promise.all([
      Lead.findByIdAndDelete(req.params.id),
      CallHistory.deleteMany({ leadId: req.params.id }),
    ]);

    res.json({ message: "Lead deleted successfully" });
  } catch (error) {
    console.error("Error deleting lead:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get lead statistics
exports.getLeadStats = async (req, res) => {
  try {
    const query = {};

    // If not admin, only count leads assigned to the user
    if (req.user.role !== "admin") {
      query.assignedTo = req.user.id;
    }

    // Get total leads count
    const totalLeads = await Lead.countDocuments(query);

    // Get today's follow-ups count
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const todayFollowUps = await Lead.countDocuments({
      ...query,
      followUpDate: {
        $gte: today,
        $lt: tomorrow,
      },
    });

    // Get connected calls count
    const connectedCalls = await Lead.countDocuments({
      ...query,
      callStatus: "Connected",
    });

    // Get conversion rate
    const convertedLeads = await Lead.countDocuments({
      ...query,
      leadStatus: "Admission Taken",
    });

    const conversionRate =
      totalLeads > 0 ? Math.round((convertedLeads / totalLeads) * 100) : 0;

    res.json({
      totalLeads,
      todayFollowUps,
      connectedCalls,
      conversionRate,
    });
  } catch (error) {
    console.error("Error fetching lead statistics:", error);
    res.status(500).json({ message: "Server error" });
  }
};
