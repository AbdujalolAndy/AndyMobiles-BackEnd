const { Schema, model } = require("mongoose");

const orderItemSchema = new Schema({
  item_quantity: { type: Number, required: true },
  item_price: { type: Number, required: true },
  order_id: { type: Schema.Types.ObjectId, ref: "Order" },
  product_id: { type: Schema.Types.ObjectId, ref: "Product" },
  product_image: {
    type: String,
    required: true,
  },
});

module.exports = model("OrderItem", orderItemSchema);
