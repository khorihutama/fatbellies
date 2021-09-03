'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Session extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Session.init({
    mealId: DataTypes.INTEGER,
    branchId: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    maxCapacity: DataTypes.INTEGER,
    day: DataTypes.STRING,
    startTime: DataTypes.TIME,
    endTime: DataTypes.TIME,
    isOndemand: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Session',
  });
  return Session;
};