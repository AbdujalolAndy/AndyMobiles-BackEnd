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

orderController.getTargetWishItems=async(req, res)=>{
    try{
        console.log("GET: cont/getTargetWishItems");
        assert.ok(req.member, Definer.auth_err5);
        const likedItems = new Like();
        
    }catch(err){
        console.log(`ERROR: cont/getTargetWishItems, ${err.message}`)
        res.json({state:"fail", message:err.message})
    }
}