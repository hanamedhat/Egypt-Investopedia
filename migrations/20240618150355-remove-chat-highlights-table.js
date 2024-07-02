'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // This will drop the chat_highlights table
    await queryInterface.dropTable('chat_highlights');
  },

  down: async (queryInterface, Sequelize) => {
    // This will recreate the chat_highlights table
    await queryInterface.createTable('chat_highlights', {
      expertiseArea: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      yearsOfExperience: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      certification: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'userid',
        },
      },
    });
  }
};
