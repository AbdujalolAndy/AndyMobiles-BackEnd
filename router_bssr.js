const router = require("express").Router();
const memberController = require("./controllers/memberController");
/***************************************
 *  BACKEND SERVER SIDE RENDERING      *
 *              Router                 *
 ***************************************/

//Member related APIs
router
  .get("/", memberController.homePage)
  .post("/signup", memberController.signup)
  .get("/login", memberController.login)
  .get("/authentification", memberController.checkAuthentification);

module.exports = router;
