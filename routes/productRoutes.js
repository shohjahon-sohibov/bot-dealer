const express = require("express");
const router = express.Router();

// controllers
const {
  getAllProducts,
  getProductByCategory,
  getProductByCollection,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/productController");

// middlewares
const upload = require('../middlewares/multer')

/**
 * get all products
 */
router.get("/all", getAllProducts);

/**
 * get products by category
 */
router.get("/category/:name", getProductByCategory);

/**
 * get products by collection
 */
router.get("/collection/:name", getProductByCollection);

/**
 * add a product
 */
router.post("/add", upload.single("image"), addProduct);

/**
 * update a product
 */
router.put("/update/:id", upload.single("image"), updateProduct);

/**
 * delete a product
 */
router.delete("/delete/:id", upload.single("image"), deleteProduct);

module.exports = router;
