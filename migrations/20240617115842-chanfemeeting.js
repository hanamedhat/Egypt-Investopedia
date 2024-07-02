'use strict';

/** @type {import('sequelize-cli').Migration} */
// migrations/xxxx-alter-meeting-add-offerId.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.addColumn('meeting', 'offerId', {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
              model: 'offer',
              key: 'offerId',
          },
      });
      await queryInterface.removeColumn('meeting', 'userid');
  },
  down: async (queryInterface, Sequelize) => {
      await queryInterface.addColumn('meeting', 'userid', {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
              model: 'admin',
              key: 'userid',
          },
      });
      await queryInterface.removeColumn('meeting', 'offerId');
  },
};
