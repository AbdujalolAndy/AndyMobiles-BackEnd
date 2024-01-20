const assert = require("assert");
const bcrypt = require("bcryptjs");
const MemberSchema = require("../schema/memberSchema");
const Definer = require("../lib/Definer");
const { shapeMongooseObjectId } = require("../lib/convert");

class Member {
  constructor() {
    this.memberModel = MemberSchema;
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
      const member = await this.memberModel.findOne({ mb_nick: data.mb_nick });
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
  async getAllCompaniesData() {
    try {
      const allCompanies = await this.memberModel
        .find({ mb_type: "COMPANY" })
        .exec();
      return allCompanies;
    } catch (err) {
      throw err;
    }
  }

  async memberUpdateData(data) {
    try {
      const id = shapeMongooseObjectId(data._id);
      delete data._id
      const result = await this.memberModel
        .findByIdAndUpdate({ _id: id }, data, {returnDocument:"after"})
        .exec();
      return result;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Member;
