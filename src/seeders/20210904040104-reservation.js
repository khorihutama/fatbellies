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
          date: "2021-09-05 12:00:00",
          price: 5,
          sessionId: 26,
          userId: 1,
        },
        {
          date: "2021-09-05 12:00:00",
          price: 5,
          sessionId: 26,
          userId: 1,
        },
        {
          date: "2021-09-05 12:00:00",
          price: 5,
          sessionId: 26,
          userId: 1,
        },
        {
          date: "2021-09-05 12:00:00",
          price: 5,
          sessionId: 26,
          userId: 1,
        },
        {
          date: "2021-09-05 12:00:00",
          price: 5,
          sessionId: 26,
          userId: 1,
        },
        {
          date: "2021-09-05 12:00:00",
          price: 5,
          sessionId: 26,
          userId: 1,
        },
        {
          date: "2021-09-05 12:00:00",
          price: 5,
          sessionId: 26,
          userId: 1,
        },
        {
          date: "2021-09-05 12:00:00",
          price: 5,
          sessionId: 26,
          userId: 1,
        },
        {
          date: "2021-09-05 12:00:00",
          price: 5,
          sessionId: 26,
          userId: 1,
        },
        {
          date: "2021-09-05 12:00:00",
          price: 5,
          sessionId: 26,
          userId: 1,
        },
        {
          date: "2021-09-05 12:00:00",
          price: 5,
          sessionId: 26,
          userId: 1,
        },
        
        {
          date: "2021-09-05 12:00:00",
          price: 5,
          sessionId: 2,
          userId: 1,
        },
        {
          date: "2021-09-05 12:00:00",
          price: 5,
          sessionId: 2,
          userId: 1,
        },
        
        {
          date: "2021-09-05 12:00:00",
          price: 5,
          sessionId: 2,
          userId: 1,
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
  },
};
