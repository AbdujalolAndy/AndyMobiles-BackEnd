const router = require("express").Router();
const memberController = require("./controllers/memberController");
const productController = require("./controllers/productController");
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
  .get(
    "/all-companies",
    memberController.memberRetrieveEjs,
    memberController.getAllCompanies
  )
  .get("/home", memberController.memberRetrieveEjs, memberController.home)
  .post("/memberUpdate", memberController.memberUpdate);

//Product related APIs
router
  .get(
    "/all-products",
    memberController.memberRetrieveEjs,
    productController.getAllProducts
  )
  .get(
    "/create-product",
    memberController.memberRetrieveEjs,
    productController.createProductProcess
  );

module.exports = router;
