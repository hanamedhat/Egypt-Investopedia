'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // This will drop the chat_highlights table
    await queryInterface.dropTable('chat_request');
  },

  down: async (queryInterface, Sequelize) => {
    // This will recreate the chat_highlights table
    await queryInterface.createTable('chat_request', {
      requestId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      startupOwnerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'startup_owner',
          key: 'userid',
        },
      },
      investorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'investor',
          key: 'userid',
        },
      },
      financialAdvisorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'financial_advisor',
          key: 'userid',
        },
      },
    });
  }
};
