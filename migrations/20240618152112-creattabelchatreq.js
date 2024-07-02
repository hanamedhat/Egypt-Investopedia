'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('chat_request', {
      requestId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userid:{
        type:Sequelize.INTEGER,
        allowNull:false,
          references:{
            model:'user',
            key:'userid',
          },
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('chat_request');
  }
};
