require("dotenv").config();
require("./config/passport.js");

const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const routes = require("./routes/mainRoutes.js");
const morgan = require("morgan");
var cors = require("cors");
const passport = require("passport");
const { conn } = require("./db.js");
const server = express();
const SequelizeStore = require("connect-session-sequelize")(session.Store);

server.use(cors({ credentials: true, origin: `${process.env.FRONTEND_URL}` }));
server.use(cookieParser(`${process.env.EXPRESS_SESSION_KEY}`))

// Creamos session store
const sessionStore = new SequelizeStore({
  db: conn,
  table: "Session",
  extendDefaultFields: (defaults, session) => ({
    data: defaults.data,
    expires: defaults.expires,
    sid: session.sid,
  }),
});
// Configuramos express-session
server.use(
  session({ 
    secret: `${process.env.EXPRESS_SESSION_KEY}`,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      httpOnly: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 30 * 60 * 1000,
    },
  })
);

sessionStore.sync();

server.name = "API";
server.use(morgan("dev"));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Passport
server.use(passport.initialize());
server.use(passport.session());

server.use((req, res, next) => {
  console.log({ isAuthenticated: req.isAuthenticated()} );
  console.log({ user: req.user} );
  next();
});
server.use((req, res, next) => {
  // console.log({ headers: req.headers });
  console.log({ cookie: req.headers.cookie });
  next();
});
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
