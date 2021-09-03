"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /* *
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Meals", [
      {
        name: "Buffet A",
      },
      { name: "Buffet B" },
      { name: "Buffet C" },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Meals", null, {});
  },
};
