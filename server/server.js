const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Import routes
const leadRoutes = require("./routes/leadRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/leads", leadRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

// Basic route for testing
app.get("/", (req, res) => {
  res.send("Lead Management System API is running");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong on the server" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
