const assert = require("assert");
const MemberSchema = require("../schema/memberSchema");

class Member {
  constructor() {
    this.memberModel = MemberSchema
  }

  async signupData(data){
    try{
        const member = new this.memberModel(data);
        const result = await member.save();
        return result;
    }catch(err){
        throw err
    }
  }
}

module.exports = Member;
