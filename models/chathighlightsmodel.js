const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ChatHighlights = sequelize.define('ChatHighlights', {
    highlightId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    highlightDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    financialAdvisorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'financial_advisor',
        key: 'id',
      },
    },
    userid:{
      type:DataTypes.INTEGER,
      allowNull:false,
      references:{
        model:'user',
        key:'userid',
      },
    }
  }, {
    tableName: 'chat_highlights',
    timestamps: false,
  });
  
  module.exports = ChatHighlights;
  