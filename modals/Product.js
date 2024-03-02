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
      //Initilization Filter
      const match = {};
      match["product_status"] = "PROCESS";
      if (queries.company_id) {
        queries.company_id = shapeMongooseObjectId(queries?.company_id);
        match["company_id"] = queries.company_id;
      }
      const pipelines = [];
      pipelines.push({ $match: match });
      const sort = {};
      //Top Filter
      switch (queries.order) {
        case "lowToHigh":
          sort["product_price"] = 1;
          pipelines.push({ $sort: sort });
          break;
        case "highToLow":
          sort["product_price"] = -1;
          pipelines.push({ $sort: sort });
          break;
        case "newToOld":
          sort["createdAt"] = -1;
          pipelines.push({ $sort: sort });
          break;
        case "oldToNew":
          sort["createdAt"] = 1;
          pipelines.push({ $sort: sort });
          break;
        case "like":
          sort["product_likes"] = -1;
          pipelines.push({ $sort: sort });
          break;
        case "view":
          sort["product_views"] = -1;
          pipelines.push({ $sort: sort });
          break;
        case "new":
          match["product_new_released"] = "Y";
          break;
        case "random":
          pipelines.push({ $sample: { size: queries.limit * 1 } });
          break;
        default:
          break;
      }

      //Left Filter
      if (queries.minPrice && queries.maxPrice) {
        match["product_price"] = {
          $gte: queries.minPrice * 1,
          $lte: queries.maxPrice * 1,
        };
      }
      if (queries.page) {
        pipelines.push({ $skip: (queries.page * 1 - 1) * queries.limit });
      }
      if (queries.color) {
        match["product_color"] = queries.color;
      }
      if (queries.minMonthlyFee && queries.maxMonthlyFee) {
        sort["product_monthly_fee"] = {
          $gte: queries.minMonthlyFee*1,
          $lte: queries.maxMonthlyFee*1,
        };
      }
      if (queries.storage) {
        match["product_storage"] = queries.storage * 1;
      }
      // Final result
      pipelines.push({ $limit: queries.limit * 1 });
      const result = await this.productModel.aggregate(pipelines).exec();
      return result;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Product;
