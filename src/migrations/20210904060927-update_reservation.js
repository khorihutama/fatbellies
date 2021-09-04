'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
       await queryInterface.addConstraint('Reservations', {
      fields: ['sessionId'],
      type: 'foreign key',
      name: 'sessionId_fkey_constraint_name',
      references: {
        table: 'Sessions',
        field: 'id'
      },
      onDelete: 'cascade',
    });
    await queryInterface.addConstraint('Reservations', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'userId_fkey_constraint_name',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
    });

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Reservations', 'sessionId_fkey_constraint_name');
    await queryInterface.removeConstraint('Reservations', 'userId_fkey_constraint_name');
  }
};