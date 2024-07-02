'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('chat_highlights', {
      highlightId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      time: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      highlightDescription: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      financialAdvisorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'financial_advisor',
          key: 'id',
        },
      },
      userid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'userid',
        },
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('chat_highlights');
  }
};
