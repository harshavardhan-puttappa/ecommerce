const express = require("express");
const router = express.Router();
const {
  create,
  productById,
  read,
  removeProduct,
  updateProduct,
  list,
  listRelated,
  listCategories,
  listBySearch,
  photo,
} = require("../../controllers/product");
const {
  requireSignin,
  isAuthorized,
  isAdmin,
} = require("../../controllers/auth");

const { userById } = require("../../controllers/user");

// route to read the product
router.get("/product/:productId", read);

// route for creating product
router.post(
  "/product/create/:userId",
  requireSignin,
  isAdmin,
  isAuthorized,
  create
);

// route to delete product
router.delete(
  "/product/:productId/:userId",
  requireSignin,
  isAdmin,
  isAuthorized,
  removeProduct
);

// route to update product
router.put(
  "/product/:productId/:userId",
  requireSignin,
  isAdmin,
  isAuthorized,
  updateProduct
);

router.get("/products", list);
router.get("/products/related/:productId", listRelated);
router.get("/products/categories", listCategories);
router.post("/products/by/search", listBySearch);
router.get("/product/photo/:productId", photo);

// execute whenever there is userId or productId in the URL
router.param("userId", userById);
router.param("productId", productById);

module.exports = router;
