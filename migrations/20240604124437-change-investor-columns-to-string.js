// migrations/YYYYMMDDHHMMSS-change-investor-columns-to-string.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('investor', 'investmentHorizon', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.changeColumn('investor', 'roiExpectations', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.changeColumn('investor', 'profBackground', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.changeColumn('investor', 'riskTolerance', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.changeColumn('investor', 'areaOfExpertise', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.changeColumn('investor', 'preference', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.changeColumn('investor', 'involvementLevel', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.changeColumn('investor', 'additionalValue', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.changeColumn('investor', 'comments', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.changeColumn('investor', 'ROI', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.changeColumn('investor', 'wantedAmount', {
      type: Sequelize.STRING,
      allowNull: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('investor', 'investmentHorizon', {
      type: Sequelize.INTEGER,
      allowNull: false
    });
    await queryInterface.changeColumn('investor', 'roiExpectations', {
      type: Sequelize.INTEGER,
      allowNull: false
    });
    await queryInterface.changeColumn('investor', 'profBackground', {
      type: Sequelize.INTEGER,
      allowNull: false
    });
    await queryInterface.changeColumn('investor', 'riskTolerance', {
      type: Sequelize.INTEGER,
      allowNull: false
    });
    await queryInterface.changeColumn('investor', 'areaOfExpertise', {
      type: Sequelize.INTEGER,
      allowNull: false
    });
    await queryInterface.changeColumn('investor', 'preference', {
      type: Sequelize.INTEGER,
      allowNull: false
    });
    await queryInterface.changeColumn('investor', 'involvementLevel', {
      type: Sequelize.INTEGER,
      allowNull: false
    });
    await queryInterface.changeColumn('investor', 'additionalValue', {
      type: Sequelize.INTEGER,
      allowNull: false
    });
    await queryInterface.changeColumn('investor', 'comments', {
      type: Sequelize.INTEGER,
      allowNull: false
    });
    await queryInterface.changeColumn('investor', 'ROI', {
      type: Sequelize.INTEGER,
      allowNull: false
    });
    await queryInterface.changeColumn('investor', 'wantedAmount', {
      type: Sequelize.INTEGER,
      allowNull: false
    });
  }
};
