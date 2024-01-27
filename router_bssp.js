const router = require("express").Router();
const memberController = require("./controllers/memberController");
const productController = require("./controllers/productController");
const photoImageUploaderProduct = require("./utilities/multerUploader")("products");
const photoImageUploaderMember = require("./utilities/multerUploader")("members");

/***************************************
 *     BACKEND SERVER SINGLE PAGE      *
 *              Router                 *
 ***************************************/
//Member related APIs
router
  .post("/signup", memberController.signupJson)
  .get("/login", memberController.loginJson)
  .post(
    "/member/member-edit",
    memberController.memberRetrieve,
    photoImageUploaderMember.single("mb_image"),
    memberController.memberUpdate
  );

//Product releted APIsX
router.post(
  "/product/create-product",
  memberController.memberRetrieve,
  photoImageUploaderProduct.array("product_images", 6),
  productController.createProduct
);

module.exports = router;
