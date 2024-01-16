const app = require("express")();

app.get("/", (req, res) => {
  res.send("Hello world!");
});

module.exports = app;
