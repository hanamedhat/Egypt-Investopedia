const { Sequelize } = require('sequelize');

// Create Sequelize instance (database connection)
const sequelize = new Sequelize('egypt-investopedia', 'root', '1673Hana', {
  dialect: 'mysql',
});

module.exports = sequelize;
