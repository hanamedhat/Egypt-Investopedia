// migrations/YYYYMMDDHHMMSS-add-investmentType-to-investor.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Investor', 'investmentId', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Investor', 'investmentId',{
      type: Sequelize.STRING,
      allowNull: false
    });
  }
};