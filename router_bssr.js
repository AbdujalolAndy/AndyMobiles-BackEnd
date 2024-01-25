const router = require("express").Router();
const memberController = require("./controllers/memberController");
const productController = require("./controllers/productController");
const notificationController = require("./controllers/notificationController");
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
    "/companies",
    memberController.memberRetrieveEjs,
    memberController.getAllCompanies
  )
  .get("/", memberController.memberRetrieveEjs, memberController.home)
  .post("/memberUpdate", memberController.memberUpdate);

//Product related APIs
router
  .get(
    "/products",
    memberController.memberRetrieveEjs,
    productController.getAllProducts
  )
  .get(
    "/create-product",
    memberController.memberRetrieveEjs,
    productController.createProductProcess
  )
  .post(
    "/product-edit/:id",
    memberController.memberRetrieveEjs,
    productController.updateProduct
  );

//Notification related APIs
router.get(
  "/notifications",
  memberController.memberRetrieveEjs,
  notificationController.getNotifications
);
module.exports = router;
