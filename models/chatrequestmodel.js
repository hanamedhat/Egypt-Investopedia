const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');


const ChatRequest = sequelize.define('ChatRequest', {
  requestId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userid:{
    type:DataTypes.INTEGER,
    allowNull:false,
      references:{
        model:'user',
        key:'userid',
      },
  },
  roomid: {
    type: DataTypes.INTEGER,
    allowNull: true, // Set to false if this column should not be nullable
  }
  
}, {
  tableName: 'chat_request',
  timestamps: false,
});

module.exports = ChatRequest;
