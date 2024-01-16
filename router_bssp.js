const router = require("express").Router();

/***************************************
 *     BACKEND SERVER SINGLE PAGE      *
 *              Router                 *
 ***************************************/

router.get("/", (req, res) => {
  res.json({ state: "sucess", data: "Hello BSSP" });
});

module.exports = router;
