const assert = require("assert");
const Product = require("../modals/Product");
const Definer = require("../lib/Definer");
const moment = require("moment");

const productController = module.exports;
productController.createProductProcess = async (req, res) => {
  try {
    console.log("GET: cont/createProductProcess");
    res.render("addProduct", { member: req.member });
  } catch (err) {
    console.log(`ERROR: cont/createProductProcess, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};
productController.createProduct = async (req, res) => {
  try {
    console.log("POST: cont/createProducts");
    assert.ok(req.member, Definer.auth_err5);
    assert.ok(req.member.mb_type === "COMPANY", Definer.auth_err4);
    const data = req.body;
    data.product_images = req.files.map((ele) => ele.path.replace(/\\/g, "/"));
    data.product_date_manufacture = moment(
      data.product_date_manufacture
    ).format("YYYY-MM-DD");
    console.log(data.product_date_manufacture);
    const product = new Product();
    const result = await product.createProductData(req.member, data);
    console.log("new Product", result);
    res.json({ state: "success", value: result });
  } catch (err) {
    console.log(`ERROR: cont/createProducts, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};
productController.updateProduct = async (req, res) => {
  try {
    console.log("cont/updateProduct");
    assert.ok(req.member.mb_type === "COMPANY", Definer.smth_err1);
    const product_id = req.params.id;
    const data = req.body;
    const product = new Product();
    const updated_product = await product.updateProductData(product_id, data);
    res.json({ state: "success", value: updated_product });
  } catch (err) {
    console.log(`ERROR: cont/updateProduct, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};
productController.getAllProducts = async (req, res) => {
  try {
    console.log("GET: cont/getAllCompanies");
    assert.ok(req.member, Definer.auth_err5);
    assert.ok(req.member.mb_type === "COMPANY", Definer.smth_err1);
    const product = new Product();
    const allProducts = await product.getAllProductsData(req.member, req.query);
    res.render("all-products", {
      member: req.member,
      poducts: allProducts,
      filterTitle: req.query.order ?? "All",
    });
  } catch (err) {
    console.log(`ERROR: cont/getAllCompanies, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};
