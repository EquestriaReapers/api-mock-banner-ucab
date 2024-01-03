'use strict';
const fechaActual = new Date();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('roles', [
      { name: 'admin', createdAt: fechaActual, updatedAt: fechaActual },
      { name: 'graduate', createdAt: fechaActual, updatedAt: fechaActual },
      { name: 'student', createdAt: fechaActual, updatedAt: fechaActual },
      { name: 'teacher', createdAt: fechaActual, updatedAt: fechaActual }
    ], {});
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {});
  }
};
