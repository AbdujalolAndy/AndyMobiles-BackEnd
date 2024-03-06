const { Schema, model } = require("mongoose");

const OrderSchema = new Schema(
  {
    mb_id: {
      type: Schema.Types.ObjectId,
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
    order_in_basket: {
      type: String,
      default: "Y",
      enum: {
        values: ["Y", "N"],
        message: "{VALUE} is not among permitted values",
      },
    },
    order_delivery_cost: {
      type: Number,
    },
    order_subtotal: {
      type: Number,
    },
  },
  { timestamps: true }
);
