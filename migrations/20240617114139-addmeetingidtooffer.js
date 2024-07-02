'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('offer', 'meetingId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'meeting',
        key:'meetingId',
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('offer', 'meetingId');
  }
};
