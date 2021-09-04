'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Reservations', {
      fields: ['sessionId'],
      type: 'foreign key',
      references: {
        table: 'Sessions',
        field: 'id'
      },
      onDelete: 'cascade',
    });
    await queryInterface.addConstraint('Reservations', {
      fields: ['userId'],
      type: 'foreign key',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
    });

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('branchId', 'mealId');
  }
};