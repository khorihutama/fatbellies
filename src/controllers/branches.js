const { Branch } = require("../models");

class BranchControllers {
  static async save(req, res, next) {
    let { name, latitude, longitude, openingHour } = req.body;
    await Branch.create({ name, latitude, longitude, openingHour });
    res.status(201).json({ message: "created" });
  }

  static async getAll(req, res, next) {
    let branches = await Branch.findAll();
    res.status(200).json({ message: "success get data", data: branches });
  }

  static async getById(req, res, next) {
    let { id } = req.params;
    let branches = await Branch.findOne({ where: { id: id } });
    if (branches == null) res.status(404).json({ message: "Branch not found" });
    res.status(200).json({ message: "success get data", data: branches });
  }

  static async update(req, res, next) {
    let { id } = req.params;
    let { name, latitude, longitude, openingHour } = req.body;
    await Branch.update(
      { name, latitude, longitude, openingHour },
      {
        where: {
          id,
        },
      }
    );
    let data = await Branch.findOne({ where: { id } });
    if (data == null) res.status(404).json({ message: "Branch not found" });
    res.status(200).json({ message: "success update branches", data });
  }

  static async delete(req, res, next) {
    let { id } = req.params;

    let branches = await Branch.destroy({
      where: {
        id,
      },
    });
    if (branches == 0) res.status(404).json({ message: "Branch not found" });

    res.status(200).json({ message: "success delete Branch" });
  }
}

module.exports = BranchControllers;
