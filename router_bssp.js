const router = require("express").Router();
const memberController = require("./controllers/memberController");
const companyController = require("./controllers/companyController");
const productController = require("./controllers/productController");
const communityController = require("./controllers/communityController");
const bankCardController = require("./controllers/bankCardController");
const orderController = require("./controllers/orderController");
const followController = require("./controllers/followController");
const wishListController = require("./controllers/wishListContoller");
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
  .post("/login", memberController.loginJson)
  .post("/signup", memberController.signupJson)
  .get("/logout", memberController.memberRetrieve, memberController.logout)
  .post(
    "/member/member-edit",
    memberController.memberRetrieve,
    photoImageUploaderMember.single("mb_image"),
    memberController.memberUpdate
  )
  .post(
    "/member/resetPassword",
    memberController.memberRetrieve,
    memberController.resetPassword
  )
  .get(
    "/member/:mb_id",
    memberController.memberRetrieve,
    memberController.getChosenMember
  );

//Brands related API
router
  .get("/brands/getTargetBrands", companyController.getTargetBrands)
  .get("/brands/getAllBrands", companyController.getAllBrands);

//Product releted APIs
router
  .post(
    "/products/getTargetProducts",
    memberController.memberRetrieve,
    productController.getTargetProducts
  )
  .get("/products/product/:product_id", productController.getChosenProduct)
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
    communityController.createPost
  )
  .get("/blogs/getTargetBlogs", communityController.getTargetBlogs)
  .post(
    "/community/image",
    memberController.memberRetrieve,
    photoImageUploaderCommunity.single("community_image"),
    communityController.returImagePath
  )
  .get("/community/chosenBlog/:blog_id", communityController.getChosenBlog);

//Community Reviews
router.post(
  "/review/createReview",
  memberController.memberRetrieve,
  communityController.createReview
);
router.get("/review/getReviews/:item_id", communityController.getReviews);

//Bank Card related API
router
  .post(
    "/bankcard/createBankCard",
    memberController.memberRetrieve,
    bankCardController.createBankCard
  )
  .get(
    "/bankcard/getTargetCard",
    memberController.memberRetrieve,
    bankCardController.getTargetCard
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
    "/follow/subscribe",
    memberController.memberRetrieve,
    followController.subscribeMember
  )
  .post(
    "/follow/unsubscribe",
    memberController.memberRetrieve,
    followController.unsubscribeMember
  )
  .post(
    "/follow/followings",
    memberController.memberRetrieve,
    followController.getFollowingMembers
  )
  .post(
    "/follow/followers",
    memberController.memberRetrieve,
    followController.getFollowerMembers
  );

//WishList related APIs
router.get(
  "/wishlist/getAllWishedItems",
  memberController.memberRetrieve,
  wishListController.getAllWishedList
);

router.post(
  "/wishlist/createWishlistItem",
  memberController.memberRetrieve,
  wishListController.createWishListItem
);
router.put(
  "/wishlist/editWishlistItem",
  memberController.memberRetrieve,
  wishListController.editWishListItem
);

router.get(
  "/wishlist/removeWishlistItem/:product_id",
  memberController.memberRetrieve,
  wishListController.removeWishListItem
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

//Transaction
router.post(
  "/bankCard/transaction/:id",
  memberController.memberRetrieve,
  bankCardController.transaction
);

module.exports = router;
