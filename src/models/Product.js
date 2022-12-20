import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
  },
  { versionKey: false } // Elimina el campo __v
);

const Product = mongoose.model("Product", productSchema, "products");

export default Product;
