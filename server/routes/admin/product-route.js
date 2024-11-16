const express = require("express");

const {
  handleImageUpload,
  addProduct,
  editProduct,
  deleteProducts,
  fetchAllProducts,
} = require("../../controlers/admin/products-controler.js");

const { upload } = require("../../helpers/cloudinary");

const router = express.Router();

router.post("/upload-image", upload.single("my_file"), handleImageUpload);
router.post("/add", addProduct);
router.put("/edit/:id", editProduct);
router.delete("/delete/:id", deleteProducts);
router.get("/get", fetchAllProducts);
module.exports = router;