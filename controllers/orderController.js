
const orderController = module.exports;
const Order = require("../modals/Order");
const assert = require("assert");
const Definer = require("../lib/Definer");

orderController.createOrder = async (req, res) => {
  try {
    console.log("POST: cont/createOrder");
    assert.ok(req.member, Definer.auth_err5);
    const data = req.body;
    const order = new Order();
    const result = await order.createOrderData(req.member, data);
    res.json({ state: "success", value: result });
  } catch (err) {
    console.log(`ERROR: cont/createOrder, ${err.message}`);
    res.json({state:"fail", message:err.message})
  }
};
