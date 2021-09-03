"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Branches", [
      {
        name: "Branch X",
        latitude: "-7.790638",
        longitude: "110.368167",
        openingHour: "08:00 am - 09:00 pm",
      },
      {
        name: "Branch Y",
        latitude: "-6.928726",
        longitude: "107.637774",
        openingHour: "08:00 am - 10:00 pm",
      },
      {
        name: "Branch Z",
        latitude: "-7.302732",
        longitude: "112.746392",
        openingHour: "08:00 am - 09:00 pm",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Branches', null, {});
  },
};
