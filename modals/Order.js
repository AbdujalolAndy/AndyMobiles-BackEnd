const { shapeMongooseObjectId } = require("../lib/convert");
const OrderItemSchema = require("../schema/orderItemSchema");
const OrderSchema = require("../schema/orderSchema");
const uuid = require("uuid")

class Order {
  constructor() {
    (this.orderModel = OrderSchema), (this.orderItemModel = OrderItemSchema);
  }

  async createOrderData(member, orders) {
    try {
      //ToDo
      //shape Mongoose Object Id
      const mb_id = shapeMongooseObjectId(member._id);
      const order_code = uuid.v1().slice(0,13)
      //orders total amount
      let order_total_amount = 0;
      for (let order of orders) {
        order_total_amount += order.item_price * order.item_quantity;
      }
      //orders subtotal
      let order_subtotal_amount = 0;
      for (let order of orders) {
        order_subtotal_amount += order.item_price;
      }
      //order delievery discount
      let order_delivery_cost = 0;
      if (order_total_amount > 1200) {
        order_delivery_cost = 0;
      } else {
        order_delivery_cost = 10;
      }
      const order_data = {
        mb_id: mb_id,
        order_code:order_code,
        order_delivery_cost: order_delivery_cost,
        order_status: "PAUSED",
        order_delivery_cost: order_delivery_cost,
        order_total_amount: order_total_amount,
        order_subtotal_amount: order_subtotal_amount,
      };
      //Create order
      const order_id = await this.createOrderId(order_data);
      //order_id to order every item
      await this.saveOrderItems(orders, order_id);
      //return order id
      return order_id
    } catch (err) {
      throw err;
    }
  }
  async createOrderId(data) {
    try {
      const order = new this.orderModel(data);
      const result = await order.save();
      return result;
    } catch (err) {
      throw err;
    }
  }

  async saveOrderItems(orders,order_id){
    try{
      const promiseList=[]
      orders.map((ele)=>{
        ele.order_id = order_id._id
        promiseList.push((new this.orderItemModel(ele)).save())
      })
      const result = await Promise.all(promiseList);
      return result
    }catch(err){
      throw err
    }
  }
}

module.exports = Order;
