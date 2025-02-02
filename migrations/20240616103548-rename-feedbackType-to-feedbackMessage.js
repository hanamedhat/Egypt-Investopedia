'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('feedback', 'feedbackType', 'feedbackSubject');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('feedback', 'feedbackSubject', 'feedbackType');
  }
};
