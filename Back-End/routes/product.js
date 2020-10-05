const express = require("express");
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const {
  create,
  productById,
  read,
  remove,
  update,
  list,
  listRelated,
  listCategory,
  listBySearch,
  photo,
} = require("../controllers/product");
const { userById } = require("../controllers/user");
// const { remove } = require("../models/user");

router.get("/product/:productId", read);
router.post("/product/create/:userId", requireSignin, isAuth, isAdmin, create);
router.delete(
  "/product/:productId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  remove
);
router.put(
  //update
  "/product/:productId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  update
);

router.get("/products", list);
router.get("/products/related/:productId", listRelated);
router.get("/products/categories", listCategory);
router.post("/products/by/search", listBySearch);
router.get("/product/photo/:productId", photo);

router.param("userId", userById);
router.param("productId", productById);

module.exports = router;

//product
