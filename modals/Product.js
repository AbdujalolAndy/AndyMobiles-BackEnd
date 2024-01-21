const { shapeMongooseObjectId } = require("../lib/convert");
const productSchema = require("../schema/productSchema");

class Product {
  constructor() {
    this.productModel = productSchema;
  }

  async createProductData(member, data) {
    try {
      const mb_id = shapeMongooseObjectId(member._id);
      data.company_id = mb_id;
      const product = new this.productModel(data);
      const new_product = await product.save();
      return new_product;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Product;
