"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Session extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    
    static associate(models) {
      // define association here
      const Branch = sequelize.models.Branch;
      const Meal = sequelize.models.Meal
      Branch.hasMany(Session, { foreignKey: "branchId" });
      Meal.hasMany(Session, { foreignKey: "mealId" });
    }
  }
  Session.init(
    {
      price: DataTypes.INTEGER,
      maxCapacity: DataTypes.INTEGER,
      day: DataTypes.STRING,
      startTime: DataTypes.TIME,
      endTime: DataTypes.TIME,
      isOndemand: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Session",
    }
  );
  return Session;
};
