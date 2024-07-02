'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Remove the userid column from the meeting table
    await queryInterface.removeColumn('meeting', 'offerid');
  },

  down: async (queryInterface, Sequelize) => {
    // If needed, you can define the logic to add back the column in the down migration
    await queryInterface.addColumn('meeting', 'offerid', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'admin',
        key: 'userid',
      },
    });
  },
};
