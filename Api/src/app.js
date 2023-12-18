require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const routes = require("./routes/mainRoutes.js");
const morgan = require("morgan");
var cors = require("cors");
const passport = require("passport");
// importamos la configuracion de passport 
require("./middlewares/googleAuthMiddleware.js");

const server = express();

server.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

server.use(cors({ credentials: true , origin: `http://${process.env.FRONTEND_URL}` }));
server.use(cookieParser());
server.name = "API";
server.use(morgan("dev"));
server.use(express.json());
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(passport.initialize());
server.use(passport.session());
server.use("/", routes);

// Error catching endware.
server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
