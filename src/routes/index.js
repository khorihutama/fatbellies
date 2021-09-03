const app = require("express")();

const mealsRouter = require("./meal");
const branchesRouter = require("./branch");
const sessionsRouter = require("./session");
const reservationsRouter = require("./reservation");

app.use("/meals", mealsRouter);
app.use("/branches", branchesRouter);
app.use("/sessions", sessionsRouter);
app.use("/reservations", reservationsRouter);

module.exports = app