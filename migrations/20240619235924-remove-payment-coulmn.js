'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('payment', 'paymentDate');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('payment', 'paymentDate', {
      type: Sequelize.DATE,
      allowNull: false,
    });
  }
};
