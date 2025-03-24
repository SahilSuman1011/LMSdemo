const mongoose = require("mongoose");
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres'
});

const CallHistory = sequelize.define('CallHistory', {
  leadId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  status: {
    type: DataTypes.ENUM('Connected', 'Not Connected'),
    allowNull: false,
  },
  disposition: {
    type: DataTypes.ENUM('Interested', 'Not Interested', 'Admission Taken'),
    defaultValue: null,
  },
  remarks: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
});

module.exports = CallHistory;

module.exports = mongoose.model("CallHistory", CallHistorySchema);
