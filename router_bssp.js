const router = require("express").Router();
const memberController = require("./controllers/memberController");
const productController = require("./controllers/productController");
const photoImageUploader = require("./utilities/multerUploader")("products");

/***************************************
 *     BACKEND SERVER SINGLE PAGE      *
 *              Router                 *
 ***************************************/
//Member related APIs
router
  .post("/signup", memberController.signupJson)
  .get("/login", memberController.loginJson);

//Product releted APIsX
router
  .post(
  "/product/create-product",
  memberController.memberRetrieve,
  photoImageUploader.array("product_images", 6),
  productController.createProduct
);

module.exports = router;
