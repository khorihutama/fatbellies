const express = require("express");
const app = express();
const port = process.env.APP_PORT || 3000;
const router = require('./src/routes/index')
const db = require('./src/models')
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use('/api/v1', router)
app.use("/", (req, res) => {
  res.json({ message: "hello world" });
});

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});
app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
