'use strict';
const bcrypt = require('bcrypt');
const { User, Admin } = require('../models/associations'); // Adjust based on your actual model imports

const saltRounds = 10; // Number of salt rounds for bcrypt

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create a user
    const passwordHash = await bcrypt.hash('123456789Admin*', saltRounds);
    const user = await User.create({
      email: 'admin@gmail.com',
      password:passwordHash,
      age: 30,
      firstName: 'hana',
      lastName: 'medhat',
      phoneNumber: '1234567890',
      linkedIn: 'john-doe-linkedin',
      jobTitle: 'Software Engineer',
      gender: 'female',
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Hash the password
   
    // Create an admin entry linked to the user
    await Admin.create({
      role: 'admin', // Adjust based on your actual role field
      userid: user.userid, // Make sure to use the correct field name here
    });

    return Promise.resolve(); // or return true; or any other truthy value
  },

  down: async (queryInterface, Sequelize) => {
    // Delete the admin entry and user
    await Admin.destroy({ where: { role: 'admin' } });
    await User.destroy({ where: { email: 'admin@gmail.com' } });
    
    return Promise.resolve(); // or return true; or any other truthy value
  }
};
