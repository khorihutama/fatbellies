const { Branch, Session, Reservation } = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const moment = require("moment");

class SessionControllers {
  static async save(req, res, next) {
    let {
      price,
      maxCapacity,
      day,
      startTime,
      endTime,
      isOndemand,
      branchId,
      mealId,
    } = req.body;
    await Session.create({
      price,
      maxCapacity,
      day,
      startTime,
      endTime,
      isOndemand,
      branchId,
      mealId,
    });
    res.status(201).json({ message: "created" });
  }

  static async getAll(req, res, next) {
    let sessions = await Session.findAll();
    res.status(200).json({ message: "success get data", data: sessions });
  }

  static async getById(req, res, next) {
    let { id } = req.params;
    let sessions = await Session.findOne({ where: { id: id } });
    if (sessions == null)
      res.status(404).json({ message: "Session not found" });
    res.status(200).json({ message: "success get data", data: sessions });
  }

  static async filter(req, res, next) {
    let { name, price, date } = req.body;
    let days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    let session = await Session.findAll({
      include: [
        {
          model: Branch,
          where: {
            name: { [Op.substring]: name },
          },
        },
      ],
      where: {
        startTime: {
          [Op.lte]: moment(date).format("HH:mm:ss"),
        },
        endTime: {
          [Op.gt]: moment(date).format("HH:mm:ss"),
        },
        day: days[moment(date).day()],
        price: price,
      },
    });

    let filtered = session.filter((el) => el.isOndemand == false);
    if (session.length > 1) {
      filtered = session.filter((el) => el.isOndemand == true);
    }

    let reservation = await Reservation.findAll({
      where: {
        date,
      },
    });

    let result = filtered.filter((el) => el.maxCapacity > reservation.length);

    res.status(200).json({ result });
  }

  static async update(req, res, next) {
    let { id } = req.params;
    let {
      price,
      maxCapacity,
      day,
      startTime,
      endTime,
      isOndemand,
      branchId,
      mealId,
    } = req.body;
    await Session.update(
      {
        price,
        maxCapacity,
        day,
        startTime,
        endTime,
        isOndemand,
        branchId,
        mealId,
      },
      {
        where: {
          id,
        },
      }
    );
    let data = await Session.findOne({ where: { id } });
    if (data == null) res.status(404).json({ message: "Session not found" });
    res.status(200).json({ message: "success update sessions", data });
  }

  static async delete(req, res, next) {
    let { id } = req.params;

    let sessions = await Session.destroy({
      where: {
        id,
      },
    });
    if (sessions == 0) res.status(404).json({ message: "Session not found" });

    res.status(200).json({ message: "success delete Session" });
  }
}

module.exports = SessionControllers;
