const { Schema, model } = require("mongoose");
const { like_group_enums } = require("../lib/enums");

const likeSchema = new Schema({
  mb_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  like_item_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  like_group: {
    type: String,
    enum: {
      values: like_group_enums,
      message: "{VALUE} is among permitted values!",
    },
  },
});

module.exports = model("Like", likeSchema);
