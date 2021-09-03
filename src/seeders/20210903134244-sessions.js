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
    let data = [];

    let price = [2, 3, 5];
    let day = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    let start = ["08:00:00", "12:00:00", "16:00:00"];
    let end = ["12:00:00", "16:00:00", "20:00:00"];
    for(let br=1; br<=3 ; br++) {

      for (let i = 0; i < 7; i++) {
        data.push({
          price: price[Math.floor(Math.random() * (2 + 1))],
          maxCapacity: 10,
          day: day[i],
          startTime: start[0],
          endTime: end[0],
          isOndemand: false,
          branchId: br,
          mealId: Math.floor(Math.random() * (2 + 1)) + 1,
        });
        data.push({
          price: price[Math.floor(Math.random() * (2 + 1))],
          maxCapacity: 10,
          day: day[i],
          startTime: start[1],
          endTime: end[1],
          isOndemand: false,
          branchId: br,
          mealId: Math.floor(Math.random() * (2 + 1)) + 1,
        });
        data.push({
          price: price[Math.floor(Math.random() * (2 + 1))],
          maxCapacity: 10,
          day: day[i],
          startTime: start[2],
          endTime: end[2],
          isOndemand: false,
          branchId: br,
          mealId: Math.floor(Math.random() * (2 + 1)) + 1,
        });
      }
      for (let i = 0; i < 3; i++) {
        data.push({
          price: 3,
          maxCapacity: 15,
          day: day[i],
          startTime: start[i],
          endTime: end[i],
          isOndemand: true,
          branchId: br,
          mealId: Math.floor(Math.random() * (2 + 1)) + 1,
        });
      }
    }

    await queryInterface.bulkInsert("Sessions", data);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Sessions', null, {});
  },
};
