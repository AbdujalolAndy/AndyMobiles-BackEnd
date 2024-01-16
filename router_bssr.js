const router = require("express").Router();
const memberController = require("./controllers/memberController")
/***************************************
 *  BACKEND SERVER SIDE RENDERING      *
 *              Router                 *
 ***************************************/

//Member related APIs
router.post("/signup", memberController.signup)
router.get("/login", memberController.login)

module.exports = router;