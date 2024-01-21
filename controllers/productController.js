const assert = require("assert");
const Product = require("../modals/Product");
const Definer = require("../lib/Definer");

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
    assert.ok(req.member.mb_type === "COMPANY", Definer.auth_err4);
    const data = req.body;
    const product = new Product();
    const result = await product.createProductData(req.member, data);
    res.state({ state: "success", value: result });
  } catch (err) {
    console.log(`ERROR: cont/createProducts, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};
productController.getAllProducts = async (req, res) => {
  try {
    console.log("GET: cont/getAllCompanies");
    res.render("all-products", { member: req.member });
  } catch (err) {
    console.log(`ERROR: cont/getAllCompanies, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};
