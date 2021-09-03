const { Reservation } = require("../models");

class ReservationControllers {
  static async save(req, res, next) {
    let { date, price, sessionId, userId } = req.body;
    await Reservation.create({ date, price, sessionId, userId });
    res.status(201).json({ message: "created" });
  }

  static async getAll(req, res, next) {
    let reservations = await Reservation.findAll();
    res.status(200).json({ message: "success get data", data: reservations });
  }

  static async getById(req, res, next) {
    let { id } = req.params;
    let reservations = await Reservation.findOne({ where: { id: id } });
    if (reservations == null) res.status(404).json({ message: "Reservation not found" });
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
    if (data == null) res.status(404).json({ message: "Reservation not found" });
    res.status(200).json({ message: "success update reservations", data });
  }

  static async delete(req, res, next) {
    let { id } = req.params;

    let reservations = await Reservation.destroy({
      where: {
        id,
      },
    });
    if (reservations == 0) res.status(404).json({ message: "Reservation not found" });

    res.status(200).json({ message: "success delete Reservation" });
  }
}

module.exports = ReservationControllers;
