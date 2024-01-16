const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const express_session = require("express-session");
const MongoDb_store = require("connect-mongodb-session")(express_session);
const router_bssr = require("./router_bssr");
const router_bssp = require("./router_bssp");

const store = new MongoDb_store({
  uri: process.env.MONGODB_URL,
  collection: "Session",
});

//middlewares
app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//sessions
app.use(
  express_session({
    secret: process.env.SECRET_COOKIE,
    store: store,
    cookie: {
      maxAge: 60 * 1000 * 30,
      httpOnly:false,
    },
    resave: true,
    saveUninitialized: true,
  })
);

//view engine
app.set("./views", "./views");
app.set("view engine", "ejs");

//router
app.use("/admin", router_bssr);
app.use("/", router_bssp);
module.exports = app;
