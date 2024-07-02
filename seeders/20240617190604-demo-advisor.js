'use strict';
const bcrypt = require('bcrypt');
const { User, Advisor } = require('../models/associations'); // Adjust based on your actual model imports

const saltRounds = 10; // Number of salt rounds for bcrypt

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create a user
    const passwordHash = await bcrypt.hash('123456789Advisor*', saltRounds);
    const user = await User.create({
      email: 'advisor@gmail.com',
      password:passwordHash,
      age: 30,
      firstName: 'Yara',
      lastName: 'Essam',
      phoneNumber: '1234567890',
      linkedIn: 'john-doe-linkedin',
      jobTitle: 'Financial Advisor',
      gender: 'female',
      role: 'advisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Hash the password
   
    // Create an admin entry linked to the user
    await Advisor.create({
      expertiseArea: 1,
      yearsOfExperience:2,
      certification:3, 
      userid: user.userid, // Make sure to use the correct field name here
    });

    return Promise.resolve(); // or return true; or any other truthy value
  },

  down: async (queryInterface, Sequelize) => {
    // Delete the admin entry and user
    await Advisor.destroy({ where: { role: 'advisor' } });
    await User.destroy({ where: { email: 'advisor@gmail.com' } });
    
    return Promise.resolve(); // or return true; or any other truthy value
  }
};
