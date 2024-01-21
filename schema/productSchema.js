const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    company_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    product_name: {
      type: String,
      required: true,
    },
    product_color: {
      type: String,
      required: true,
    },
    product_display: {
      type: String,
      required: true,
    },
    product_core: {
      type: String,
      required: true,
    },
    product_memory: {
      type: Number,
      required: true,
    },
    product_ram: {
      type: Number,
      required: true,
    },
    product_camera: {
      type: String,
      required: true,
    },
    product_price: {
      type: Number,
      required: true,
    },
    product_deal: {
      type: String,
      default: "N",
      enum: {
        values: ["Y", "N"],
        message: "{VALUE} is not among permitted list",
      },
    },
    product_water_proof: {
      type: String,
      default: "N",
      enum: {
        values: ["Y", "N"],
        message: "{VALUE} is not among permitted list",
      },
    },
    product_second_hand: {
      type: String,
      default: "N",
      enum: {
        values: ["Y", "N"],
        message: "{VALUE} is not among permitted list",
      },
    },
    product_discount: {
      type: Number,
      default: 0,
    },
    product_likes: {
      type: Number,
      default: 0,
    },
    product_views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

productSchema.index(
  { company_id: 1, product_name: 1, product_memory: 1, product_core: 1, product_color:1, },
  { unique: true }
);

module.exports = mongoose.model("Product", productSchema)
