const router = require("express").Router();
const memberController = require("./controllers/memberController")
/***************************************
 *  BACKEND SERVER SIDE RENDERING      *
 *              Router                 *
 ***************************************/

router.post("/signup", memberController.signup)
module.exports = router;