const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Investor = sequelize.define('Investor', {
  investmentHorizon: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  industries: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  roiExpectations: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profBackground: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  riskTolerance: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  areaOfExpertise: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  preference: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  involvementLevel: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  additionalValue: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  comments: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ROI: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  wantedAmount: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  investmentType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  investmentId: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: true,
  },
  profileImage:{
    type: DataTypes.STRING,
    allowNull: true,
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
  tableName: 'investor',
  timestamps: false,
});

module.exports = Investor;
