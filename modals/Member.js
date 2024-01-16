const assert = require("assert");
const bcrypt = require("bcryptjs");
const MemberSchema = require("../schema/memberSchema");
const Definer = require("../lib/Definer");

class Member {
  constructor() {
    this.memberModel = MemberSchema;
  }

  async signupData(data) {
    try {
      const salt = await bcrypt.genSalt();
      const hash_password = await bcrypt.hash(data.mb_password, salt);
      data.mb_password = hash_password;
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
      assert.ok(data.mb_nick == member.mb_nick, Definer.auth_err1);
      assert.ok(data.mb_password == member.mb_password, Definer.auth_err2);

      return member;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Member;
