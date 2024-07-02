const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Feedback = sequelize.define('Feedback', {
    feedbackId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    feedbackDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    feedbackSubject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    feedbackMessage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'userid',
      },
    },
  }, {
    tableName: 'feedback',
    timestamps: false,
  });
  
  module.exports = Feedback;
  