const productController = module.exports;

productController.getAllProducts = async (req, res) => {
  try {
    console.log("GET: cont/getAllCompanies");
    res.render("all-products", { member: req.member });
  } catch (err) {
    console.log("ERROR: cont/getAllCompanies");
    res.json({ state: "fail", message: err.message });
  }
};
