require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const routes = require("./routes/mainRoutes.js");
const morgan = require("morgan");
var cors = require("cors");
const passport = require("passport");
const { conn } = require("./db.js");
// importamos la configuracion de passport
require("./middlewares/googleAuthMiddleware.js");
const server = express();
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// Creamos session store
const sessionStore = new SequelizeStore({
  db: conn,
  table: "Session",
  extendDefaultFields: (defaults, session) => ({
    data: defaults.data,
    expires: defaults.expires,
    sid: session.sid,
  }),
});;
// Configuramos esxpress-session
server.use(
  session({
    secret: `${process.env.EXPRESS_SESSION_KEY}`,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: { secure: true,  maxAge: 2 * 60 * 60 * 1000, },
  })
);

server.use(cors({ credentials: true, origin: `${process.env.FRONTEND_URL}` }));
server.name = "API";
server.use(morgan("dev"));
server.use(express.json());
server.use(express.urlencoded({ extended: true}));
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
