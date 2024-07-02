'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('chat_highlights', 'financialAdvisorId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'financial_advisor',
        key: 'id',
      },
    });

    await queryInterface.addColumn('chat_highlights', 'userid', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'userid',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('chat_highlights', 'financialAdvisorId');
    await queryInterface.removeColumn('chat_highlights', 'userid');
  }
};
