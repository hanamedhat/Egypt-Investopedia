'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('startup_owner', 'previousRound', 'founders');
    await queryInterface.changeColumn('startup_owner', 'founders', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('startup_owner', 'experience', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.renameColumn('startup_owner', 'previousStartups', 'teamRoles');
    await queryInterface.changeColumn('startup_owner', 'teamRoles', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('startup_owner', 'biography', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('startup_owner', 'founders', 'previousRound');
    await queryInterface.changeColumn('startup_owner', 'previousRound', {
      type: Sequelize.STRING,
      allowNull: false // Change to the original allowNull setting
    });
    
    // Change columns back to their original allowNull settings
    await queryInterface.changeColumn('startup_owner', 'experience', {
      type: Sequelize.STRING,
      allowNull: false // Change to the original allowNull setting
    });

    // Rename columns back to their original names
    await queryInterface.renameColumn('startup_owner', 'teamRoles', 'previousStartups');
    await queryInterface.changeColumn('startup_owner', 'previousStartups', {
      type: Sequelize.STRING,
      allowNull: false // Change to the original allowNull setting
    });

    await queryInterface.changeColumn('startup_owner', 'biography', {
      type: Sequelize.STRING,
      allowNull: false // Change to the original allowNull setting
    });
  }
};
