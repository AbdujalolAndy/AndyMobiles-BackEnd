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
  async updateProductData(product_id, data) {
    try {
      const id = shapeMongooseObjectId(product_id);
      const result = await this.productModel.fin
        .findByIdAndUpdate({ _id: id }, data)
        .exec();
      return result;
    } catch (err) {
      throw err;
    }
  }

  async getAllProductsData(member, query) {
    try {
      const company_id = shapeMongooseObjectId(member._id);
      let result;
      if (query.order === "ALL") {
        result = await this.productModel
          .find({ company_id: company_id })
          .exec();
      } else {
        result = await this.productModel
          .find({ company_id: company_id, product_status: query.order })
          .exec();
      }
      return result;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Product;
