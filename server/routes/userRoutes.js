const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { protect, admin } = require("../middleware/authMiddleware");

// User login
router.post("/login", userController.loginUser);

// Get user profile
router.get("/profile", protect, userController.getUserProfile);

// Update user profile
router.put("/profile", protect, userController.updateUserProfile);

// Register a new user (admin only)
router.post("/", protect, userController.registerUser);

// Get all users (admin only)
router.get("/", protect, userController.getUsers);

// Get user by ID (admin only)
router.get("/:id", protect, userController.getUserById);

// Update user (admin only)
router.put("/:id", protect, userController.updateUser);

// Delete user (admin only)
router.delete("/:id", protect, userController.deleteUser);

// Assign leads to user (admin only)
router.post("/assign-leads", protect, userController.assignLeadsToUser);

module.exports = router;
