'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('chat_request', 'roomid', {
      type: Sequelize.INTEGER,
      allowNull: true, // Set to false if this column should not be nullable
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('chat_request', 'roomid');
  }
};
