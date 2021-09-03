"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const Session = sequelize.models.Session;
      const User = sequelize.models.User;
      Session.hasMany(Reservation, { foreignKey: "sessionId" });
      User.hasMany(Reservation, { foreignKey: "userId" });
      // define association here
    }
  }
  Reservation.init(
    {
      date: DataTypes.DATE,
      price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Reservation",
    }
  );
  return Reservation;
};
