'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('startup', 'website', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('startup', 'target', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('startup', 'totalRaising', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('startup', 'investorRole', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('startup', 'usingFunds', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('startup', 'investmentType', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('startup', 'risks', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.renameColumn('startup', 'feasabilityStudies', 'addFinancials');
    await queryInterface.changeColumn('startup', 'addFinancials', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('startup', 'businessExplanation', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('startup', 'theMarket', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('startup', 'progress', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('startup', 'objective', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('startup', 'nonProfit', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('startup', 'logo', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('startup', 'pImage', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('startup', 'legalStructure', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('startup', 'taxRegister', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('startup', 'commercialRec', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.changeColumn('startup', 'businessPlan', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('startup', 'website', {
      type: Sequelize.STRING,
      allowNull: false // Change to the original allowNull setting
    });
    await queryInterface.changeColumn('startup', 'target', {
      type: Sequelize.STRING,
      allowNull: false // Change to the original allowNull setting
    });
    await queryInterface.removeColumn('startup', 'totalRaising');
    await queryInterface.removeColumn('startup', 'investorRole');
    await queryInterface.removeColumn('startup', 'usingFunds');
    await queryInterface.removeColumn('startup', 'investmentType');
    await queryInterface.removeColumn('startup', 'risks');
    await queryInterface.renameColumn('startup', 'addFinancials', 'feasabilityStudies');
    await queryInterface.changeColumn('startup', 'feasabilityStudies', {
      type: Sequelize.STRING,
      allowNull: false // Change to the original allowNull setting
    });
    await queryInterface.changeColumn('startup', 'businessExplanation', {
      type: Sequelize.STRING,
      allowNull: false // Change to the original allowNull setting
    });
    await queryInterface.changeColumn('startup', 'theMarket', {
      type: Sequelize.STRING,
      allowNull: false // Change to the original allowNull setting
    });
    await queryInterface.changeColumn('startup', 'progress', {
      type: Sequelize.STRING,
      allowNull: false // Change to the original allowNull setting
    });
    await queryInterface.changeColumn('startup', 'objective', {
      type: Sequelize.STRING,
      allowNull: false // Change to the original allowNull setting
    });
    await queryInterface.changeColumn('startup', 'nonProfit', {
      type: Sequelize.STRING,
      allowNull: false // Change to the original allowNull setting
    });
    await queryInterface.changeColumn('startup', 'logo', {
      type: Sequelize.STRING,
      allowNull: false // Change to the original allowNull setting
    });
    await queryInterface.changeColumn('startup', 'pImage', {
      type: Sequelize.STRING,
      allowNull: false // Change to the original allowNull setting
    });
    await queryInterface.changeColumn('startup', 'legalStructure', {
      type: Sequelize.STRING,
      allowNull: false // Change to the original allowNull setting
    });
    await queryInterface.changeColumn('startup', 'taxRegister', {
      type: Sequelize.STRING,
      allowNull: false // Change to the original allowNull setting
    });
    await queryInterface.changeColumn('startup', 'commercialRec', {
      type: Sequelize.STRING,
      allowNull: false // Change to the original allowNull setting
    });
    await queryInterface.changeColumn('startup', 'businessPlan', {
      type: Sequelize.STRING,
      allowNull: false // Change to the original allowNull setting
    });
  }
};
