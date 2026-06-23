import Product from "../model/product.js";

export const addproduct = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Image Is Required",
      });
    }
    // productImage
    const { productName, mrpPrice, price, description } = req.body;
    console.log(productName, mrpPrice, price, description);

    const productImage = req.file.filename;
    console.log(req.file.filename);


    const newProduct = await Product.create({
      productName,
      mrpPrice,
      price,
      description,
      productImage: req.file.filename,
      adminId: req.userId, //why not req.adminId:: Agar tum middleware mein req.userId likhte ho aur controller mein req.adminId dhoondoge, toh controller ko woh property undefined milegi.
    });

    return res.status(200).json({
      message: "Your Product Added Successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "SERVER ERROR",
      err: err.message,
    });
  }
};

export const productlist = async (req, res) => {
  try {
    const products = await Product.find();

    return res.status(200).json(products); // normally islliye nahi likha kyu ki backend frontend direect  mai array bheje ga
  } catch (err) {
    return res.status(500).json({
      message: "SERVER ERROR",
      err: err.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { productName, mrpPrice, price, description } = req.body;

    const updateData = {
      productName,
      mrpPrice,
      price,
      description,
    };

    if (req.file) {
      updateData.productImage = req.file.filename;
    }

    const updateProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: updateData }, // set use karna safe rehta hai object saath use hoga
      { new: true }, // Ye option batata hai ki updated document return karo
    );

    return res.status(200).json({
      message: "Product Updated Successfully",
      updateProduct,
    });
  } catch (err) {
    return res.status(500).json({
      message: "SERVER ERROR",
      err: err.message,
    });
  }
};

export const deleteproduct = async (req, res) => {
  try {
    //  const deleteProduct =
    await Product.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      message: "Product Deleted Successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "SERVER ERROR",
      err: err.message,
    });
  }
};

