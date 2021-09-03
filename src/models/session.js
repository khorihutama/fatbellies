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
      const Meal = sequelize.models.Meal;
      Branch.hasMany(Session, { foreignKey: "branchId" });
      Meal.hasMany(Session, { foreignKey: "mealId" });
    }
  }
  Session.init(
    {
      price: DataTypes.INTEGER,
      maxCapacity: DataTypes.INTEGER,
      day: DataTypes.ENUM("sun", "mon", "tue", "wed", "thu", "fri", "sat"),
      startTime: DataTypes.TIME,
      endTime: DataTypes.TIME,
      isOndemand: DataTypes.BOOLEAN,
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("NOW()"),
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("NOW()"),
      },
    },
    {
      sequelize,
      modelName: "Session",
    }
  );
  return Session;
};
