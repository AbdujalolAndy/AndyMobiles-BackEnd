const MemberSchema = require("../schema/memberSchema");

class Company {
  constructor() {
    this.memberModel = MemberSchema;
  }
}

module.exports = Company;
