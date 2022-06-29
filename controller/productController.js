const Product = require("../models/Product");

const getProductByCategory = async (req, res) => {
  try {
    const product = await Product.find({ category: req.body.category });
    const productArr = [];
    for (const element of product) {
        !productArr.includes(element.collection_name) ? productArr.push(element.collection_name) : ""
    }
    res.send(productArr);
  } catch (err) {
    res.status(500).send({
      message: `category problem, ${err.message}`,
    });
  }
};

const getProductByCollection = async (req, res) => {
  try {
    const product = await Product.find({
      collection_name: req.params.collection_name,
    });
    console.log(product, "getProductByCollection");
    res.send(product);
  } catch (err) {
    res.status(500).send({
      message: `collection_name problem, ${err.message}`,
    });
  }
};

const addProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(200).send({
      message: "Product Added Successfully!",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.code = req.body.code;
      product.category = req.body.category;
      product.description = req.body.description;
      product.collection_name = req.body.collection_name;
      product.color = req.body.color;
      product.image = req.body.image;
      await product.save();
      res.send({ data: product, message: "Product updated successfully!" });
    }
  } catch (err) {
    res.status(404).send(err.message);
  }
};

const deleteProduct = (req, res) => {
  Product.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else {
      res.status(200).send({
        message: "Product Deleted Successfully!",
      });
    }
  });
};

module.exports = {
  getProductByCategory,
  getProductByCollection,
  addProduct,
  updateProduct,
  deleteProduct,
};
