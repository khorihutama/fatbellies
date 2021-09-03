const { Session } = require("../models");

class SessionControllers {
  static async save(req, res, next) {
    let { price, maxCapacity, day, startTime, endTime, isOndemand, branchId, mealId } = req.body;
    await Session.create({ price, maxCapacity, day, startTime, endTime, isOndemand, branchId, mealId });
    res.status(201).json({ message: "created" });
  }

  static async getAll(req, res, next) {
    let sessions = await Session.findAll();
    res.status(200).json({ message: "success get data", data: sessions });
  }

  static async getById(req, res, next) {
    let { id } = req.params;
    let sessions = await Session.findOne({ where: { id: id } });
    if (sessions == null) res.status(404).json({ message: "Session not found" });
    res.status(200).json({ message: "success get data", data: sessions });
  }

  static async update(req, res, next) {
    let { id } = req.params;
    let { price, maxCapacity, day, startTime, endTime, isOndemand, branchId, mealId } = req.body;
    await Session.update(
      { price, maxCapacity, day, startTime, endTime, isOndemand, branchId, mealId },
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
