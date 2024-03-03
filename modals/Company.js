const MemberSchema = require("../schema/memberSchema");

class Company {
  constructor() {
    this.memberModel = MemberSchema;
  }

  async getTargetBrandsData(queries) {
    try {
      const pipelines = [];
      const match = {
        mb_type: "COMPANY",
        mb_status: "ACTIVE",
        mb_nick: "Valve",
        mb_nick: "Huwai",
      };
      if (queries.search) {
        match["mb_nick"] = new RegExp("^" + queries.search, "i");
      }
      pipelines.push({ $match: match });
      pipelines.push({ $sort: { [queries.order]: -1 } });
      if (queries.page) {
        pipelines.push({ $skip: (queries.page * 1 - 1) * (queries.limit * 1) });
      }
      if (queries.order == "random") {
        pipelines.push({ $sample: { size: queries.limit * 1 } });
      }
      pipelines.push({ $limit: queries.limit * 1 });
      const allCompanies = await this.memberModel.aggregate(pipelines).exec();
      return allCompanies;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Company;
