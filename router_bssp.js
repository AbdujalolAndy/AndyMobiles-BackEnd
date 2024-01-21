const router = require("express").Router();
const memberController = require("./controllers/memberController");
const productController = require("./controllers/productController");

/***************************************
 *     BACKEND SERVER SINGLE PAGE      *
 *              Router                 *
 ***************************************/
//Member related APIs
router
  .post("/signup", memberController.signupJson)
  .get("/login", memberController.loginJson);

//Product releted APIsX
router.post(
  "/product/create-product",
  memberController.memberRetrieve,
  productController.createProduct
);

module.exports = router;
