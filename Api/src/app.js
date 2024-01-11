require("dotenv").config();
require("./config/passport.js");

const express = require("express");
const routes = require("./routes/mainRoutes.js");
const morgan = require("morgan");
var cors = require("cors");
const passport = require("passport");

const { sessionFlag, refreshTokenCheck } = require("./middlewares/jwtSession.js");
const server = express();

server.name = "API";
server.use(cors({ credentials: true, origin: `${process.env.FRONTEND_URL}` }));
server.use(morgan("dev"));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
// Passport
server.use(passport.initialize());
// checkea quien hace cada peticion y lo muestra por consola
server.use(sessionFlag)
server.use(refreshTokenCheck)
// Entryp0nt de la ruta principal
server.use("/", routes);


// Error catching endware.
server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
