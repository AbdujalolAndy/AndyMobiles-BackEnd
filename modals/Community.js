const assert = require("assert");
const { shapeMongooseObjectId } = require("../lib/convert");
const CommunitySchema = require("../schema/communityShema");
const ReviewSchema = require("../schema/reviewSchema");
const Definer = require("../lib/Definer");

class Community {
  constructor() {
    this.communityModel = CommunitySchema;
    this.reviewModel = ReviewSchema;
  }

  async createPostData(member, file, data) {
    try {
      const mb_id = shapeMongooseObjectId(member._id);
      console.log(mb_id);
      data.blog_image = file.pathname;
      const blog = new this.communityModel({
        mb_id: mb_id,
        blog_category: data.blog_category,
        blog_title: data.blog_title,
        blog_context: data.blog_context,
      });
      assert(blog, Definer.smth_err1);
      const result = await blog.save();
      return result;
    } catch (err) {
      throw err;
    }
  }

  async getTargetBlogsData(queries) {
    try {
      //Matching
      const match = {};
      match.blog_status = "ACTIVE";
      if (queries.order && queries.order !== "ALL") {
        match.blog_category = queries.order;
      }
      if (queries.mb_id) {
        match.mb_id = shapeMongooseObjectId(queries.mb_id);
      }

      //Filtering
      const sort = {};
      switch (queries.filter) {
        case "newToOld":
          sort["createdAt"] = -1;
          break;
        case "oldToNew":
          sort["createdAt"] = 1;
          break;
        default:
          break;
      }

      //Final Return
      const limit = queries.limit * 1,
        targetBlogs = await this.communityModel
          .aggregate([
            { $match: match },
            { $sort: sort },
            { $skip: (queries.page * 1 - 1) * queries.limit * 1 },
            { $limit: queries.limit * 1 },
            {
              $lookup: {
                from: "members",
                localField: "mb_id",
                foreignField: "_id",
                as: "mb_data",
              },
            },
          ])
          .exec();
      return targetBlogs;
    } catch (err) {
      throw err;
    }
  }

  async createReviewData(member, id, data) {
    try {
      const mb_id = shapeMongooseObjectId(member._id),
        item_id = shapeMongooseObjectId(id);
      const review = new this.reviewModel({
        mb_id: mb_id,
        review_target_id: item_id,
        review_context: data.review_context,
        review_stars: data.review_stars
      });
      const result = await review.save();
      return result;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Community;
