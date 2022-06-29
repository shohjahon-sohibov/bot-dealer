const express = require("express");
const router = express.Router();

const {
  addProduct,
  updateProduct,
  getProductByCategory,
  getProductByCollection,
  deleteProduct,
} = require("../controller/productController");

/**
 * add a product
 */
router.post("/add", addProduct);

/**
 * update a product
 */
router.put("/update/:id", updateProduct);

/**
 * get products by category
 */
router.get("/category", getProductByCategory);

/**
 * get products by collection
 */
router.get("/collection", getProductByCollection);

/**
 * delete a product 
 */
router.delete("/delete/:id", deleteProduct);

module.exports = router;
