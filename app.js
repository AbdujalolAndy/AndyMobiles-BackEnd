const express = require("express");
const app = express();
const router_bssr = require("./router_bssr");
const router_bssp = require("./router_bssp");

//middlewares
app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//sessions

//view engine
app.set("./views", "./views");
app.set("view engine", "ejs");

//router
app.use("/admin", router_bssr);
app.use("/", router_bssp);
module.exports = app;
