const router = require("express").Router();
const memberController = require("./controllers/memberController");
const companyController = require("./controllers/companyController");
const productController = require("./controllers/productController");
const communityController = require("./controllers/communityController");
const photoImageUploaderProduct = require("./utilities/multerUploader")(
  "products"
);
const photoImageUploaderMember = require("./utilities/multerUploader")(
  "members"
);
const photoImageUploaderCommunity = require("./utilities/multerUploader")(
  "community"
);

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

//Brands related API
router.get("/brands/getTargetBrands", companyController.getTargetBrands);

//Product releted APIs
router
  .get("/products/getTargetProducts", productController.getTargetProducts)
  .post(
    "/product/create-product",
    memberController.memberRetrieve,
    photoImageUploaderProduct.array("product_images", 6),
    productController.createProduct
  )
  .post(
    "/products/targetProductEdit/:id",
    memberController.memberRetrieveEjs,
    productController.updateProduct
  );
//Community related API
router
  .post(
    "/blogs/createBlog",
    memberController.memberRetrieve,
    photoImageUploaderCommunity.single("blog_image"),
    communityController.createPost
  )
  .get("/blogs/getTargetBlogs", communityController.getTargetBlogs);
module.exports = router;
