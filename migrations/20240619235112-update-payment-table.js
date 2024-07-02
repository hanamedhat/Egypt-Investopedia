'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.changeColumn('payment', 'paymentAmount', {
      type: Sequelize.DECIMAL
    });
    
    await queryInterface.renameColumn('payment', 'paymentAmount', 'amount');

    await queryInterface.addColumn('payment', 'status', {
      type: Sequelize.STRING
    });
    
    await queryInterface.addColumn('payment', 'createdAt', {
      allowNull: false,
      type: Sequelize.DATE
    });
    
    await queryInterface.addColumn('payment', 'updatedAt', {
      allowNull: false,
      type: Sequelize.DATE
    });

    await queryInterface.removeColumn('payment', 'paymentMethod');
    
    // Ensuring userid column remains as is with references intact
    await queryInterface.changeColumn('payment', 'userid', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'userid',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('payment', 'amount', {
      type: Sequelize.INTEGER
    });

    await queryInterface.renameColumn('payment', 'amount', 'paymentAmount');

    await queryInterface.removeColumn('payment', 'status');

    await queryInterface.removeColumn('payment', 'createdAt');

    await queryInterface.removeColumn('payment', 'updatedAt');

    await queryInterface.addColumn('payment', 'paymentMethod', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    
    // Ensuring userid column remains as is with references intact
    await queryInterface.changeColumn('payment', 'userid', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'userid',
      },
    });
  }
};
