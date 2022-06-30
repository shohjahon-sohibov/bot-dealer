const Product = require("../models/Product");
const { SERVERLINK } = require("../config/config");

const getAllProducts = async (req, res) => {
  try {
    res.json(await Product.find());
  } catch (err) {
    res.status(500).send({
      message: `category problem, ${err.message}`,
    });
  }
};

const getProductByCategory = async (req, res) => {
  try {
    const product = await Product.find({ category: req.params.name });
    const productArr = [];
    for (const element of product) {
      !productArr.includes(element.collection_name)
        ? productArr.push(element.collection_name)
        : "";
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
      collection_name: req.params.name,
    });
    res.send(product);
  } catch (err) {
    res.status(500).send({
      message: `collection_name problem, ${err.message}`,
    });
  }
};

const addProduct = async (req, res) => {
  try {
    const { code, category, collection_name, color, description } = req.body;

    let imagesArr = [];
    const file = req.file;
    const imgUrl = `${SERVERLINK}/upload/${file.originalname}`;
    imagesArr.push(imgUrl);
    const [image] = imagesArr;

    const newProduct = new Product({
      code,
      category,
      collection_name,
      color,
      description,
      image
    });
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
  getAllProducts,
  getProductByCategory,
  getProductByCollection,
  addProduct,
  updateProduct,
  deleteProduct,
};
