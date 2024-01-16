const mongoose = require("mongoose");
const { status_enums, mb_type_enums } = require("../lib/enums");

const memberSchema = new mongoose.Schema(
  {
    mb_nick: {
      type: String,
      unique: true,
      required: true,
    },
    mb_phone: {
      type: String,
      unique: true,
      required: true,
    },
    mb_password: {
      type: String,
      required: true,
    },
    mb_status: {
      type: String,
      default: "ACTIVE",
      enum: {
        values: status_enums,
        message: "{VALUE} is not among permitted list",
      },
    },
    mb_type: {
      type: String,
      default: "USER",
      enum: {
        values: mb_type_enums,
        message: "{{VALUE} is not among permitted list}",
      },
    },
    mb_image: {
      type: String,
      default:null,
    },
    mb_address: {
      type: String,
      default:null
    },
    mb_likes: {
      type: Number,
      default: 0,
    },
    mb_views: {
      type: Number,
      default: 0,
    },
    mb_followers: {
      type: Number,
      default: 0,
    },
    mb_followings: {
      type: Number,
      default: 0,
    },
    mb_description: {
      type: String,
      default:null
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Member", memberSchema);
