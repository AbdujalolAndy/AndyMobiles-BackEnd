const assert = require("assert");
const Definer = require("../lib/Definer");

const orderController = module.exports;


orderController.createOrder = async(req, res)=>{
    try{
        console.log("POST: cont/createOrder") 

    }catch(err){
        console.log(`ERROR: cont/createOrder, ${err.message}`)
    }
}