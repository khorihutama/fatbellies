'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Sessions', {
      fields: ['branchId'],
      type: 'foreign key',
      references: {
        table: 'Branches',
        field: 'id'
      },
      onDelete: 'cascade',
    });
    await queryInterface.addConstraint('Sessions', {
      fields: ['mealId'],
      type: 'foreign key',
      references: {
        table: 'Meals',
        field: 'id'
      },
      onDelete: 'cascade',
    });

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('branchId', 'mealId');
  }
};