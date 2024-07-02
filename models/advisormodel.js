const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const FinancialAdvisor = sequelize.define('FinancialAdvisor', {
  expertiseArea: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  yearsOfExperience: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  certification: {
    type: DataTypes.INTEGER,
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
  tableName: 'financial_advisor',
  timestamps: false,
});

module.exports = FinancialAdvisor;
