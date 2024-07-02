// migrations/YYYYMMDDHHMMSS-add-investmentType-to-investor.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Investor', 'industries', {
      type: Sequelize.STRING,
      allowNull: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Investor', 'industries');
  }
};