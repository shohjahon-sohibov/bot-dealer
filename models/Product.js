const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    collection_name: {
      type: String,
      required: true,
    },
    // sizes: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "sizes",
    //   },
    // ],
    color: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
