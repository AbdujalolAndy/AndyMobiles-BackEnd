const router = require("express").Router();
const memberController = require("./controllers/memberController");
/***************************************
 *  BACKEND SERVER SIDE RENDERING      *
 *              Router                 *
 ***************************************/

//Member related APIs
router
  .post("/signup", memberController.signup)
  .post("/login", memberController.login)
  .get("/logout", memberController.logout)
  .get("/authentification", memberController.checkAuthentification)
  .get("/register", memberController.register)
  .get("/all-companies", memberController.allCompanies)
  .get("/home", memberController.home)

module.exports = router;
