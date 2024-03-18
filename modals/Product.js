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

  async getTargetProductsData(data) {
    try {
      //Initialization Filter
      const match = { product_status: "PROCESS" };

      if (data.company_id) {
        match["company_id"] = shapeMongooseObjectId(data.company_id);
      }

      const pipelines = [{ $match: match }];

      if (data.random) {
        pipelines.push({ $sample: { size: data.limit * 1 } });
      }

      // Sorting
      const sort = {};
      switch (data.order) {
        case "lowToHigh":
          sort["product_price"] = 1;
          break;
        case "highToLow":
          sort["product_price"] = -1;
          break;
        case "newToOld":
          sort["createdAt"] = -1;
          break;
        case "oldToNew":
          sort["createdAt"] = 1;
          break;
        case "like":
          sort["product_likes"] = -1;
          break;
        case "view":
          sort["product_views"] = -1;
          break;
        case "new":
          match["product_new_released"] = "Y";
          break;
        default:
          break;
      }
      if (Object.keys(sort).length > 0) {
        pipelines.push({ $sort: sort });
      }

      //Searching Item
      if (data.search) {
        match["product_name"] = new RegExp("^" + data.search, "i");
      }

      //Left Filter
      if (data.minPrice && data.maxPrice) {
        match["product_price"] = {
          $gte: data.minPrice * 1,
          $lte: data.maxPrice * 1,
        };
      }

      if (data.color) {
        match["product_color"] = data.color;
      }

      if (data.minMonthlyFee && data.maxMonthlyFee) {
        match["product_monthly_fee"] = {
          $gte: data.minMonthlyFee * 1,
          $lte: data.maxMonthlyFee * 1,
        };
      }

      if (data.storage) {
        match["product_storage"] = data.storage * 1;
      }

      if (data.page) {
        pipelines.push({ $skip: (data.page * 1 - 1) * data.limit });
      }

      // Push $limit after all other stages
      pipelines.push({ $limit: data.limit * 1 });

      // Add $lookup stage to fetch related colors
      pipelines.push({
        $lookup: {
          from: "products",
          localField: "product_name",
          foreignField: "product_name",
          as: "product_related_colors",
        },
      });

      // Project only the necessary fields from the related colors
      pipelines.push({
        $project: {
          company_id: 1,
          product_name: 1,
          product_images: 1,
          product_color: 1,
          product_display: 1,
          product_core: 1,
          product_memory: 1,
          product_ram: 1,
          product_camera: 1,
          product_price: 1,
          product_monthly_price: 1,
          product_water_proof: 1,
          product_status: 1,
          product_new_released: 1,
          product_discount: 1,
          product_monthly_fee: 1,
          product_likes: 1,
          product_views: 1,
          product_description: 1,
          product_related_colors: { _id: 1, product_color: 1, product_images:1 },
        },
      });

      const result = await this.productModel.aggregate(pipelines).exec();
      const uniqueResult = [];
      result.forEach((product) => {
        if (
          !uniqueResult.some((ele) => ele.product_name == product.product_name)
        ) {
          uniqueResult.push(product);
        }
      });
      return uniqueResult;
    } catch (err) {
      throw err;
    }
  }

  async getChosenProductData(product_id) {
    try {
      const id = shapeMongooseObjectId(product_id);
      const product = await this.productModel
        .aggregate([
          { $match: { _id: id } },
          {
            $lookup: {
              from: "members",
              localField: "company_id",
              foreignField: "_id",
              as: "company_data",
            },
          },
        ])
        .exec();
      return product;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Product;
