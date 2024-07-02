const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const StartupOwner = sequelize.define('StartupOwner', {
  founders: {//tmam migration
    type: DataTypes.STRING,
    allowNull: true,
  },
  experience: {//tmam
    type: DataTypes.STRING,
    allowNull: true,
  },
  teamRoles: {//tmam migration
    type: DataTypes.STRING,
    allowNull: true,
  },
  biography: {//tmam
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
  tableName: 'startup_owner',
  timestamps: false,
});

module.exports = StartupOwner;
