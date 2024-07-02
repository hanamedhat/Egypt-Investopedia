const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Offer = sequelize.define('Offer', {
    offerId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Pending',
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    offerDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    offerComment: {
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
    startupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'startup',
        key: 'startupId',
      },
    },
    meetingId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'meeting',
        key: 'meetingId',
      },
    },
  }, {
    tableName: 'offer',
    timestamps: false,
  });
  
  module.exports = Offer;
  