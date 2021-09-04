const { Branch, Session, Reservation } = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const moment = require("moment");
const e = require("express");

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
    let { name, price, date, time, lat, long } = req.body;
    let days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

    let whereCondition = {};
    if (time != undefined) {
      whereCondition = {
        startTime: {
          [Op.lte]: time,
        },
        endTime: {
          [Op.gt]: time,
        },
      };
    }
    if (days != undefined) whereCondition.day = days[moment(date).day()];
    if (price != undefined) whereCondition.price = price;
    let session = await Session.findAll({
      include: [
        {
          model: Branch,
          where: {
            name: { [Op.substring]: name },
          },
        },
      ],
      where: whereCondition,
    });

    const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
      var R = 6371; // Radius of the earth in km
      var dLat = deg2rad(lat2 - lat1); // deg2rad below
      var dLon = deg2rad(lon2 - lon1);
      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) *
          Math.cos(deg2rad(lat2)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c; // Distance in km
      return d; // distance returned
    };

    const deg2rad = (deg) => {
      return deg * (Math.PI / 180);
    };

    let sessionRes = session.map((el) => {
      const {
        id,
        price,
        maxCapacity,
        day,
        startTime,
        endTime,
        branchId,
        Branch,
      } = el;
      return {
        id,
        price,
        maxCapacity,
        day,
        startTime,
        endTime,
        branchId,
        branchName: Branch.name,
        lat: Branch.latitude,
        long: Branch.longitude,
        distance: getDistanceFromLatLonInKm(
          parseInt(Branch.latitude),
          parseInt(Branch.longitude),
          lat,
          long
        ),
      };
    });
    sessionRes.sort(function (a, b) {
      return a.distance - b.distance;
    });

    let reservation = await Reservation.findAll({
      where: {
        date,
      },
    });

    let result = sessionRes.filter((el) => el.maxCapacity > reservation.length);

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
