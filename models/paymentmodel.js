const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
// Ensure this path is correct

const Payment = sequelize.define('Payment', {
  paymentId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL,
  },
  status: {
    type: DataTypes.STRING,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
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
  tableName: 'payment',
  timestamps: false,
});

module.exports = Payment;
