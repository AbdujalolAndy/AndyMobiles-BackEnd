const assert = require("assert");
const { shapeMongooseObjectId } = require("../lib/convert");
const bankInfoSchema = require("../schema/bankInfoSchema");
const TransactionSchema = require("../schema/bankTransaction");
const Cryptr = require("cryptr");

class BankCard {
  constructor() {
    this.bankModel = bankInfoSchema;
    this.transactionModel = TransactionSchema;
  }

  async createBankCardData(member, data) {
    try {
      const mb_id = shapeMongooseObjectId(member._id);
      //Validate Card Number
      if (!data.card_pincode.length === 16) {
        throw new Error("Card Number should be number with length of 16");
      }
      //Encode Card Number
      const cryptr = new Cryptr(process.env.SECRET_CARD);
      data.card_pincode = cryptr.encrypt(data.card_pincode);
      const bankCard = new this.bankModel({
        mb_id: mb_id,
        card_owner_name: data.card_owner_name,
        card_number: data.card_number,
        card_expiry: data.card_expiry,
        card_cvc: data.card_cvc,
        card_pincode: data.card_pincode,
      });
      //mongodb database
      const result = await bankCard.save();
      return result;
    } catch (err) {
      throw err;
    }
  }
  async updateCardData(member, data) {
    try {
      const mb_id = shapeMongooseObjectId(member._id);
      const result = await this.bankModel
        .findOneAndUpdate({ mb_id: mb_id }, data, {
          runValidators: true,
          returnDocument: "after",
        })
        .exec();
      return result;
    } catch (err) {
      throw err;
    }
  }
  async getTargetCardData(member) {
    try {
      const mb_id = shapeMongooseObjectId(member._id);
      const result = await this.bankModel
        .find({
          mb_id: mb_id,
          card_status: "ACTIVE",
        })
        .exec();
      return result;
    } catch (err) {
      throw err;
    }
  }

  async transactionData(member, id, data) {
    try {
      const mb_id = shapeMongooseObjectId(member._id);
      const order_id = shapeMongooseObjectId(id);
      let transaction;
      const isDataEmpty = !!Object.keys(data)[0]
      console.log(isDataEmpty)
      if (!isDataEmpty) {
        //Exsist bank card
        const existCard = await this.bankModel.findOne({ mb_id: mb_id }).exec();
        assert.ok(existCard, "att: You do not have Existed card on your account")
        transaction = new this.transactionModel({
          mb_id: mb_id,
          order_id: order_id,
          trans_owner: existCard.card_owner_name,
          trans_card_number: existCard.card_number,
          trans_card_expiry: existCard.card_expiry,
          trans_card_cvc: existCard.card_cvc,
          trans_card_pincode: existCard.card_pincode,
        });
      } else{
        const trans_card_pincode = new Cryptr(process.env.SECRET_CARD).encrypt(
          data.trans_card_pincode
        );
        transaction = new this.transactionModel({
          mb_id: mb_id,
          order_id: order_id,
          trans_owner: data.trans_owner,
          trans_card_number: data.trans_card_number,
          trans_card_expiry: data.trans_card_expiry,
          trans_card_cvc: data.trans_card_cvc,
          trans_card_pincode: trans_card_pincode,
        });
      }
      const result = await transaction.save();
      return result;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = BankCard;
