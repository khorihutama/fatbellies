const express = require("express");
const app = express();
const port = process.env.APP_PORT || 3000;
const router = require("./src/routes/index");
const authrouter = require("./src/routes/auth");
const db = require("./src/models");
const passport = require("passport");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");
var cors = require("cors");
var corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use("/auth", authrouter);
app.use("/api/v1", passport.authenticate("jwt", { session: false }), router);
// app.use("/", (req, res) => {
//   res.json({ message: "hello world" });
// });

var options = {
  explorer: true,
};

app.use(
  "/api-docs",
  function (req, res, next) {
    swaggerDocument.host = req.get("host");
    req.swaggerDoc = swaggerDocument;
    next();
  },
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, options)
);

// app.use(function (err, req, res, next) {
//   res.status(err.status || 500);
//   res.json({ error: err });
// });

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });
app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
