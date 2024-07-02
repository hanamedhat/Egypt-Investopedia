'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('offer', 'offer_ibfk_1'); // Remove existing foreign key constraint
    
    await queryInterface.changeColumn('offer', 'userid', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'user', // Change reference to 'user' table
        key: 'userid',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('offer', 'userid'); // Remove the altered foreign key constraint

    await queryInterface.changeColumn('offer', 'userid', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'investor', // Revert reference to 'investor' table
        key: 'userid',
      },
    });
  }
};
