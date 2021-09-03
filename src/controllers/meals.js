const { Meal } = require("../models");

class MealControllers {
  static async save(req, res, next) {
    let { name } = req.body;
    await Meal.create({ name });
    res.status(201).json({ message: "created" });
  }

  static async getAll(req, res, next) {
    let meals = await Meal.findAll();
    res.status(200).json({ message: 'success get data', data: meals });
  }

  static async getById(req, res, next) {
    let { id } = req.params;
    let meals = await Meal.findOne({ where: { id: id } });
    if (meals == null) res.status(404).json({ message: 'Meal not found' });
    res.status(200).json({ message: 'success get data', data: meals });
  }

  static async update(req, res, next) {
    let { id } = req.params;
    let { name, address, phone } = req.body;
    await Meal.update(
      { name },
      {
        where: {
          id,
        },
      }
    );
    let data = await Meal.findOne({ where: { id } });
    if (data == null) res.status(404).json({ message: 'Meal not found' });
    res
      .status(200)
      .json({ message: 'success update meals', data });
  }

  static async delete(req, res, next) {
    let { id } = req.params;

    let meals = await Meal.destroy({
      where: {
        id,
      },
    });
    if (meals == 0) res.status(200).json({ message: 'Meal not found' });

    res.status(200).json({ message: 'success delete meal' });
  }
}

module.exports = MealControllers;
