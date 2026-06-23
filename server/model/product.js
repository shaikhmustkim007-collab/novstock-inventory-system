import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true, //extra space hata deta hai
    },
    mrpPrice: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    productImage: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId, // why not string add:: so String likhoge, toh MongoDB ke liye woh sirf ek random text hoga. "Lekin mongoose.Schema.Types.ObjectId" likhne se MongoDB samajh jaata hai ki yeh "kisi dusre document ki unique ID" hai.

      ref: "user", //  user model ka reference hai
      required: true,
    },
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", productSchema);

export default Product;
