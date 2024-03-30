const assert = require("assert");
const bcrypt = require("bcryptjs");
const MemberSchema = require("../schema/memberSchema");
const { Definer } = require("../lib/Definer");
const { shapeMongooseObjectId } = require("../lib/convert");
const LikeSchema = require("../schema/likeSchema");

class Member {
  constructor() {
    this.memberModel = MemberSchema;
    this.likeModel = LikeSchema;
  }

  async signupData(data) {
    try {
      const salt = await bcrypt.genSalt();
      data.mb_password = await bcrypt.hash(data.mb_password, salt);
      const member = new this.memberModel(data);
      const result = await member.save();
      return result;
    } catch (err) {
      throw err;
    }
  }

  async loginData(data) {
    try {
      const match = { mb_status: "ACTIVE" };
      if (data.mb_nick) {
        match.mb_nick = data.mb_nick;
      } else {
        match.mb_email = data.mb_email;
      }
      const member = await this.memberModel.findOne(match);
      assert.ok(member, Definer.auth_err1);
      const exsist_member = await bcrypt.compare(
        data.mb_password,
        member.mb_password
      );
      assert.ok(exsist_member, Definer.auth_err2);
      return member;
    } catch (err) {
      throw err;
    }
  }
  async getAllCompaniesData(query) {
    try {
      let allCompanies;
      if (query.order === "ALL") {
        allCompanies = await this.memberModel
          .find({ mb_type: "COMPANY" })
          .exec();
      } else {
        allCompanies = await this.memberModel
          .find({ mb_type: "COMPANY", mb_status: query.order })
          .exec();
      }
      return allCompanies;
    } catch (err) {
      throw err;
    }
  }

  async getAllUsersData(order) {
    try {
      let result;
      switch (order) {
        case "ALL":
          result = await this.memberModel.find({ mb_type: "USER" });
          break;
        case "ACTIVE":
          result = await this.memberModel.find({
            mb_type: "USER",
            mb_status: "ACTIVE",
          });
          break;
        case "PAUSED":
          result = await this.memberModel.find({
            mb_type: "USER",
            mb_status: "PAUSED",
          });
          break;
        case "DELETED":
          result = await this.memberModel.find({
            mb_type: "USER",
            mb_status: "DELETED",
          });
          break;
        default:
          break;
      }
      return result;
    } catch (err) {
      throw err;
    }
  }

  async memberUpdateData(member, image, data) {
    try {
      if (!data._id) {
        data._id = member._id;
        data.mb_image = image ? image.path.replace(/\\/g, "/") : "";
      }
      for (let prop in data) {
        if (!data[prop]) {
          delete data[prop];
        }
      }
      const id = shapeMongooseObjectId(data._id);
      delete data._id;
      const result = await this.memberModel
        .findByIdAndUpdate({ _id: id }, data, { returnDocument: "after" })
        .exec();
      return result;
    } catch (err) {
      throw err;
    }
  }

  async getAllWishedItems(member, data) {
    try {
      const mb_id = shapeMongooseObjectId(member._id);
      const wishedItems = await this.likeModel
        .aggregate([
          { $match: { mb_id: mb_id, like_group: "product" } },
          {
            $lookup: {
              from: "products",
              localField: "like_item_id",
              foreignField: "_id",
              as: "product_data",
            },
          },
        ])
        .exec();
      return wishedItems;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Member;
