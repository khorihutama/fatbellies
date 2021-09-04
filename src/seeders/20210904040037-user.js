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
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "Admin",
          email: "admin@mail.com",
          password: "password",
          latitude: "-7.515498",
          longitude: "110.775709",
          phone: "0812345678",
        },
        {
          name: "User",
          email: "user@mail.com",
          password: "password",
          latitude: "-7.283912",
          longitude: "108.197897",
          phone: "0812345678",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Users', null, {});

  },
};
