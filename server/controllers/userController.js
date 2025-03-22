const User = require("../models/User");
const Lead = require("../models/Lead");
const jwt = require("jsonwebtoken");

// Register a new user (admin only)
exports.registerUser = async (req, res) => {
  try {
    // Only admin can create new users
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Not authorized to create users" });
    }

    const { name, email, password, role } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
      role: role || "user", // Default to 'user' if role not specified
    });

    await user.save();

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// User login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields
    if (req.body.name) user.name = req.body.name;
    if (req.body.email) user.email = req.body.email;
    if (req.body.password) user.password = req.body.password;

    // Only admin can update role
    if (req.user.role === "admin" && req.body.role) {
      user.role = req.body.role;
    }

    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all users (admin only)
exports.getUsers = async (req, res) => {
  try {
    // Only admin can view all users
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to view users" });
    }

    const users = await User.find().select("-password");

    // Get lead counts for each user
    const usersWithStats = await Promise.all(
      users.map(async (user) => {
        const leadsCount = await Lead.countDocuments({ assignedTo: user._id });
        const convertedCount = await Lead.countDocuments({
          assignedTo: user._id,
          leadStatus: "Admission Taken",
        });

        return {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
          leads: leadsCount,
          conversions: convertedCount,
          conversionRate:
            leadsCount > 0
              ? Math.round((convertedCount / leadsCount) * 100)
              : 0,
        };
      }),
    );

    res.json(usersWithStats);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get user by ID (admin only)
exports.getUserById = async (req, res) => {
  try {
    // Only admin can view specific user
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to view user" });
    }

    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get lead statistics for this user
    const leadsCount = await Lead.countDocuments({ assignedTo: user._id });
    const convertedCount = await Lead.countDocuments({
      assignedTo: user._id,
      leadStatus: "Admission Taken",
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      leads: leadsCount,
      conversions: convertedCount,
      conversionRate:
        leadsCount > 0 ? Math.round((convertedCount / leadsCount) * 100) : 0,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update user (admin only)
exports.updateUser = async (req, res) => {
  try {
    // Only admin can update users
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Not authorized to update users" });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields
    if (req.body.name) user.name = req.body.name;
    if (req.body.email) user.email = req.body.email;
    if (req.body.password) user.password = req.body.password;
    if (req.body.role) user.role = req.body.role;

    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete user (admin only)
exports.deleteUser = async (req, res) => {
  try {
    // Only admin can delete users
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Not authorized to delete users" });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prevent deleting the last admin
    if (user.role === "admin") {
      const adminCount = await User.countDocuments({ role: "admin" });
      if (adminCount <= 1) {
        return res
          .status(400)
          .json({ message: "Cannot delete the last admin user" });
      }
    }

    // Reassign leads to the admin making the request
    await Lead.updateMany(
      { assignedTo: user._id },
      { assignedTo: req.user.id },
    );

    await User.findByIdAndDelete(req.params.id);

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Assign leads to user (admin only)
exports.assignLeadsToUser = async (req, res) => {
  try {
    // Only admin can assign leads
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Not authorized to assign leads" });
    }

    const { userId, leadIds } = req.body;

    // Validate user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update leads with new assignedTo
    await Lead.updateMany(
      { _id: { $in: leadIds } },
      { assignedTo: userId, updatedAt: Date.now() },
    );

    res.json({ message: "Leads assigned successfully" });
  } catch (error) {
    console.error("Error assigning leads:", error);
    res.status(500).json({ message: "Server error" });
  }
};
