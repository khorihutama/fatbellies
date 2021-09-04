const { Session, Reservation, User } = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const moment = require("moment");

class ReservationControllers {
  static async save(req, res, next) {
    let { date, branch } = req.body;

    let days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    let session = await Session.findAll({
      where: {
        branchId: branch,
        startTime: {
          [Op.lte]: moment(date).format("HH:mm:ss"),
        },
        endTime: {
          [Op.gt]: moment(date).format("HH:mm:ss"),
        },
        day: days[moment(date).day()],
      },
    });
    let filtered = session.filter((el) => el.isOndemand == false);
    if (session.length > 1) {
      filtered = session.filter((el) => el.isOndemand == true);
    }

    let { price, maxCapacity, id } = filtered[0];

    let reservation = await Reservation.findAll({
      where: {
        date,
      },
    });
    let user = await User.findOne({ email: req.user})

    if (reservation.length < maxCapacity) {
      await Reservation.create({ date, price, sessionId: id, userId: user.id });
      res.status(201).json({
        message: `success creating reservation, the price is ${price}`,
      });
    } else {
      res
        .status(400)
        .json({ message: "failed to make reservation, full capacity" });
    }
  }

  static async getAll(req, res, next) {
    let reservations = await Reservation.findAll();
    res.status(200).json({ message: "success get data", data: reservations });
  }

  static async getById(req, res, next) {
    let { id } = req.params;
    let reservations = await Reservation.findOne({ where: { id: id } });
    if (reservations == null)
      res.status(404).json({ message: "Reservation not found" });
    res.status(200).json({ message: "success get data", data: reservations });
  }

  static async update(req, res, next) {
    let { id } = req.params;
    let { date, price, sessionId, userId } = req.body;
    await Reservation.update(
      { date, price, sessionId, userId },
      {
        where: {
          id,
        },
      }
    );
    let data = await Reservation.findOne({ where: { id } });
    if (data == null)
      res.status(404).json({ message: "Reservation not found" });
    res.status(200).json({ message: "success update reservations", data });
  }

  static async delete(req, res, next) {
    let { id } = req.params;

    let reservations = await Reservation.destroy({
      where: {
        id,
      },
    });
    if (reservations == 0)
      res.status(404).json({ message: "Reservation not found" });

    res.status(200).json({ message: "success delete Reservation" });
  }
}

module.exports = ReservationControllers;
