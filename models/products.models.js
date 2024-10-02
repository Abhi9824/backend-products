const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    salePrice: { type: Number },

    percentageOff: { type: String },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    size: [{ type: String, required: true }],
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    images: {
      type: [String],
      required: true,
    },
    colors: [{ type: String }],
    description: { type: String },
    categoryId: { type: Number, required: true },
    category: { type: String, required: true },
    categoryType: [
      {
        type: String,
        required: true,
        enum: [
          "T-shirt",
          "polo",
          "mens",
          "polo t-shirt",
          "shirt",
          "trouser",
          "trousers",
          "jeans",
          "ripped jeans",
          "full-sleeves shirt",
          "shackets",
          "crop-top",
          "saree",
          "womens",
          "skirt",
          "Ghagras",
          "crew-neck",
          "casual",
          "kurtis",
          "Kurta",
          "Ethnic",
          "kids t-shirt",
          "kids pants",
          "kids shorts",
          "kids clothing",
          "kids",
          "kids shirt",
        ],
      },
    ],
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", productsSchema);

module.exports = Product;
