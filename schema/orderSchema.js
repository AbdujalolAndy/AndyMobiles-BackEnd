const { Schema, model } = require("mongoose");
const { order_status_enums } = require("../lib/enums");

const OrderSchema = new Schema(
  {
    mb_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    order_code: {
      type: String,
      required: true,
    },
    order_total_amount: {
      type: Number,
      required: true,
    },
    order_status: {
      type: String,
      default: "PAUSED",
      enum: {
        values: order_status_enums,
        message: "{VALUE} is not among permitted values",
      },
    },
    order_delivery_cost: {
      type: Number,
    },
    order_subtotal_amount: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = model("Order", OrderSchema);
