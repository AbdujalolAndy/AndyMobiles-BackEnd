const router = require("express").Router();
const memberController = require("./controllers/memberController");
const companyController = require("./controllers/companyController");
const productController = require("./controllers/productController");
const communityController = require("./controllers/communityController");
const bankCadController = require("./controllers/bankCardController");
const orderController = require("./controllers/orderController");
const followController = require("./controllers/followController");
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
  .get("/login", memberController.loginJson)
  .post("/signup", memberController.signupJson)
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

//Bank Card related API
router
  .post(
    "/bankcard/createBankCard",
    memberController.memberRetrieve,
    bankCadController.createBankCard
  )
  .post(
    "/bankcard/bankCardEdit",
    memberController.memberRetrieve,
    bankCadController.updateCard
  )
  .get(
    "/bankcard/getTargetCard",
    memberController.memberRetrieve,
    bankCadController.getTargetCard
  );

//Like Item related APIs
router.post(
  "/liked-item",
  memberController.memberRetrieve,
  memberController.likeChosenItem
);

//Following
router
  .post(
    "/follow/following",
    memberController.memberRetrieve,
    followController.followMember
  )
  .get(
    "/follow/followings",
    memberController.memberRetrieve,
    followController.getFollowingMembers
  )
  .get(
    "/follow/followers",
    memberController.memberRetrieve,
    followController.getFollowerMembers
  );

//WishList related APIs
router.get(
  "/wishlist/getAllWishedItems",
  memberController.memberRetrieve,
  memberController.getAllWishedList
);

//Order Related APIs
router
  .post(
    "/orders/createOrder",
    memberController.memberRetrieve,
    orderController.createOrder
  )
  .post(
    "/orders/editOrder/:id",
    memberController.memberRetrieve,
    orderController.updateOrder
  )
  .get(
    "/orders/getAllOrders",
    memberController.memberRetrieve,
    orderController.getAllOrders
  )
  .get(
    "/orders/getTargetOrder/:id",
    memberController.memberRetrieve,
    orderController.getTargetOrder
  );
module.exports = router;
