const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Investments = sequelize.define('Investments', {
    investmentId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    amountInvested: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    investmentDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'investor',
        key: 'userid',
      },
    },
    startupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'startup',
        key: 'startupId',
      },
    },
  }, {
    tableName: 'investments',
    timestamps: false,
  });
  
  module.exports = Investments;
  