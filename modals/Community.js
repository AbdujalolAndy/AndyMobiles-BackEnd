const assert = require("assert");
const { shapeMongooseObjectId } = require("../lib/convert");
const CommunitySchema = require("../schema/communityShema");
const Definer = require("../lib/Definer");

class Community {
  constructor() {
    this.communityModel = CommunitySchema;
  }

  async createPostData(member, file, data) {
    try {
      const mb_id = shapeMongooseObjectId(member._id);
      console.log(mb_id)
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
}

module.exports = Community;
