const { Schema, model } = require("mongoose");

const transactionSchema = new Schema(
  {
    mb_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    order_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    trans_owner: {
      type: String,
      required: true,
    },

    trans_card_number: {
      type: Number,
      required: true,
      validate: {
        validator: (value) => {
          if (value.toString().length == 16) {
            return true;
          }
          return false;
        },
        message: "att: Card number should be 16 numbers",
      },
    },
    trans_card_expiry:{
        type:String,
        required:true
    },
    trans_card_cvc:{
        type:Number,
        required: true,
        validate: {
          validator: (value) => {
            if (value.toString().length == 3) {
              return true;
            }
            return false;
          },
          message: "att: Card CVC number should be 16 numbers",
        },
    },
    trans_card_pincode:{
        type:String
    }
  },
  { timestamps: true }
);

module.exports = model("Transaction", transactionSchema);
