const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');


const Startup = sequelize.define('Startup', {
  startupId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  companyName: {//tmam
    type: DataTypes.STRING,
    allowNull: false,
  },
  website: {//tmam
    type: DataTypes.STRING,
    allowNull: true,
  },
  industry: {//tmam
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {//tmam
    type: DataTypes.STRING,
    allowNull: false,
  },
  stage: {//tmam
    type: DataTypes.STRING,
    allowNull: false,
  },
  target: {//tmam
    type: DataTypes.STRING,
    allowNull: true,
  },
  totalRaising:{//tmam bs lsa migration
    type:DataTypes.INTEGER,
    allowNull:true
  },
  investorRole:{//tmam bs lsa migration
    type:DataTypes.STRING,
    allowNull:true
  },
  usingFunds:{//tmam bs lsa migration
    type:DataTypes.STRING,
    allowNull:true
  },
  investmentType:{//tmam bs lsa migration
    type:DataTypes.STRING,
    allowNull:true
  },
  minInvestmentPp: {//tmam
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  businessExplanation: {//tmam
    type: DataTypes.STRING,
    allowNull: true,
  },
  risks:{//tmam bs lsa migration
    type:DataTypes.STRING,
    allowNull:true
  },
  theMarket: {//tmam
    type: DataTypes.STRING,
    allowNull: true,
  },
  progress: {//tmam
    type: DataTypes.STRING,
    allowNull: true,
  },
  objective: {//tmam
    type: DataTypes.STRING,
    allowNull: true,
  },
  theDeal: {//tmam
    type: DataTypes.STRING,
    allowNull: false,
  },
  addFinancials: {//tmam bs lsa migration
    type: DataTypes.STRING,
    allowNull: true,
  },
  nonProfit: {//tmam
    type: DataTypes.STRING,
    allowNull: true,
  },
  logo: {//tmam
    type: DataTypes.STRING,
    allowNull: true,
  },
  pImage: {//tmam
    type: DataTypes.STRING,
    allowNull: true,
  },
  legalStructure: {//tmam
    type: DataTypes.STRING,
    allowNull: true,
  },
  taxRegister: {//tmam
    type: DataTypes.STRING,
    allowNull: true,
  },
  commercialRec: {//tmam
    type: DataTypes.STRING,
    allowNull: true,
  },
  businessPlan: {//tmam
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending', // Possible values: 'pending', 'approved', 'rejected'
    allowNull: false
  },
  userid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'startup_owner',
      key: 'userid',
    },
  },
}, {
  tableName: 'startup',
  timestamps: false,
});

module.exports = Startup;
