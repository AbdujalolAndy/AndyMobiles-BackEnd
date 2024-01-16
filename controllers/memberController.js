const assert = require("assert");
const Member = require("../modals/Member");

const memberController = module.exports;

memberController.signup = async (req, res) => {
  try {
    console.log("POST: cont/signup");
    const member = new Member();
    const data = req.body;
    const new_member = await member.signupData(data);
    res.json({ state: "success", data: new_member });
  } catch (err) {
    console.log(`ERROR: cont/signup, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};
