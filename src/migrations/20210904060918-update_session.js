'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.addConstraint('Sessions', {
      fields: ['branchId'],
      type: 'foreign key',
      name: 'branchId_fkey_constraint_name',
      references: {
        table: 'Branches',
        field: 'id'
      },
      onDelete: 'cascade',
    });
    await queryInterface.addConstraint('Sessions', {
      fields: ['mealId'],
      type: 'foreign key',
      name: 'mealId_fkey_constraint_name',
      references: {
        table: 'Meals',
        field: 'id'
      },
      onDelete: 'cascade',
    });

  },
  down: async (queryInterface, Sequelize) => {

    await queryInterface.removeConstraint('Sessions', 'branchId_fkey_constraint_name');
    await queryInterface.removeConstraint('Sessions', 'mealId_fkey_constraint_name');
  }
};