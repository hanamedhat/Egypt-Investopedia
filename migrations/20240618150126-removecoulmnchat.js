'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('chat_highlights', 'investorId');
    await queryInterface.removeColumn('chat_highlights', 'startupOwnerId');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('chat_highlights', 'investorId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'investor',
        key: 'userid',
      },
    });
    await queryInterface.addColumn('chat_highlights', 'startupOwnerId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'startup_owner',
        key: 'userid',
      },
    });
  }
};
