const { Schema, model } = require("mongoose");
const { blog_category_enums } = require("../lib/enums");

const communitySchema = new Schema(
  {
    mb_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    blog_title: {
      type: String,
      required: true,
    },
    blog_category: {
      type: String,
      required:true,
      enum: {
        values: blog_category_enums,
        message: "{VALUE} is not among permitted enum list",
      },
    },
    blog_context: {
      type: String,
      required: true,
    },
    blog_likes: {
      type: Number,
      default: 0,
    },
    blog_views: {
      type: Number,
      default: 0,
    },
    blog_comments: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = model("Community", communitySchema);
