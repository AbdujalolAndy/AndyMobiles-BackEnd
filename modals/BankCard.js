const assert = require("assert");
const { shapeMongooseObjectId } = require("../lib/convert");
const bankInfoSchema = require("../schema/bankInfoSchema");
const Cryptr = require("cryptr");

class BankCard {
  constructor() {
    this.bankModel = bankInfoSchema;
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
}

module.exports = BankCard;
