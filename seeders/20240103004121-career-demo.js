const fechaActual = new Date();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('careers', [
      { name: 'ingenieria-industrial', createdAt: fechaActual, updatedAt: fechaActual },
      { name: 'ingenieria-informatica', createdAt: fechaActual, updatedAt: fechaActual },
      { name: 'ingenieria-civil', createdAt: fechaActual, updatedAt: fechaActual },
      { name: 'ingenieria-telecomunicaciones', createdAt: fechaActual, updatedAt: fechaActual },
      { name: 'arquitectura', createdAt: fechaActual, updatedAt: fechaActual },
      { name: 'derecho', createdAt: fechaActual, updatedAt: fechaActual },
      { name: 'psicologia', createdAt: fechaActual, updatedAt: fechaActual },
      { name: 'filosofia', createdAt: fechaActual, updatedAt: fechaActual },
      { name: 'teologia', createdAt: fechaActual, updatedAt: fechaActual },
      { name: 'letras', createdAt: fechaActual, updatedAt: fechaActual },
      { name: 'educacion', createdAt: fechaActual, updatedAt: fechaActual },
      { name: 'comunicacion-social', createdAt: fechaActual, updatedAt: fechaActual },
      { name: 'administracion', createdAt: fechaActual, updatedAt: fechaActual },
      { name: 'contaduria', createdAt: fechaActual, updatedAt: fechaActual },
      { name: 'relaciones-industriales', createdAt: fechaActual, updatedAt: fechaActual },
      { name: 'sociologia', createdAt: fechaActual, updatedAt: fechaActual },
      { name: 'economia', createdAt: fechaActual, updatedAt: fechaActual }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('careers', null, {});
  }
};
