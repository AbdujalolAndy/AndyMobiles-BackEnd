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
    res.json({ state: "fail", message: err.message });
  }
};

orderController.updateOrder = async (req, res) => {
  try {
    console.log("POST: cont/updateOrder");
    assert.ok(req.member, Definer.auth_err5);
    const order_id = req.params.id;
    const data = req.body
    const order = new Order();
    const result = await order.updateOrderData(order_id,data);
    res.json({ state: "success", value: result });
  } catch (err) {
    console.log(`ERROR: cont/updateOrder, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

orderController.getAllOrders = async (req, res) => {
  try {
    console.log("GET: cont/getAllOrders");
    assert.ok(req.member, Definer.auth_err5);
    const order = new Order();
    const result = await order.getAllOrdersData(req.member, req.body);
    res.json({ state: "success", value: result });
  } catch (err) {
    console.log(`ERROR: cont/getAllOrders, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

orderController.getTargetOrder = async (req, res) => {
  try {
    console.log("GET: cont/getTargetOrder");
    assert.ok(req.member, Definer.auth_err5);
    const data = req.params;
    const order = new Order();
    const result = await order.getTargetOrderData(req.member, data);
    res.json({ state: "success", value: result });
  } catch (err) {
    console.log(`ERROR: cont/getTargetOrder, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};
