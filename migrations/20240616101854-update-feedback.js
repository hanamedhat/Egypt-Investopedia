'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('feedback', 'feedbackType', 'feedbackMessage');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('feedback', 'feedbackMessage', 'feedbackType');
  }
};
