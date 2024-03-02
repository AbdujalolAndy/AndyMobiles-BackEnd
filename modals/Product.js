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
      const result = await this.productModel
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

  async getTargetProductsData(queries) {
    try {
      const match={};
      match["product_status"]="PROCESS"
      if (queries.company_id) {
        queries.company_id = shapeMongooseObjectId(queries?.company_id);
        match["company_id"] = queries.company_id;
      }
      const pipelines = [];
      pipelines.push({ $match: match });
      switch (queries.order) {
        case "lowToHigh":
          pipelines.push({ $sort: { product_price: 1 } });
          break;
        case "highToLow":
          pipelines.push({ $sort: { product_price: -1 } });
          break;
        case "newToOld":
          pipelines.push({ $sort: { createdAt: -1 } });
          break;
        case "oldToNew":
          pipelines.push({ $sort: { createdAt: 1 } });
          break;
        case "like":
          pipelines.push({ $sort: { product_likes: -1 } });
          break;
        case "view":
          pipelines.push({ $sort: { product_views: -1 } });
          break;
        case "new":
          match["product_new_released"]= "Y";
          break;
        case "random":
          pipelines.push({ $sample: { size: queries.limit*1 } });
          break;
        default:
          break;
      }
      if (queries.page) {
        pipelines.push({ $skip: (queries.page * 1 - 1) * queries.limit });
      }
      pipelines.push({ $limit: queries.limit * 1 });
      const result = await this.productModel.aggregate(pipelines);
      return result;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Product;
