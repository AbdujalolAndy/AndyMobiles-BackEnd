const assert = require("assert");
const Member = require("../modals/Member");
const token = require("jsonwebtoken");
const Definer = require("../lib/Definer");

const memberController = module.exports;

memberController.homePage = async () => {
  try {
    console.log("GET: cont/homePage");
    res.render("homepage");
  } catch (err) {
    connsole.log(`ERROR: cont/homepage, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

memberController.createToken = async (new_member) => {
  try {
    const upload_data = {
      _id: new_member._id,
      mb_nick: new_member.mb_nick,
      mb_type: new_member.mb_type,
    };
    return token.sign(upload_data, process.env.SECRET_TOKEN, {
      expiresIn: "6h",
    });
  } catch (err) {
    console.log(err.message);
  }
};

memberController.signup = async (req, res) => {
  try {
    console.log("POST: cont/signup");
    const member = new Member();
    const data = req.body;
    const new_member = await member.signupData(data);
    const token = await memberController.createToken(new_member);
    assert.ok(token, Definer.auth_err3);
    res.cookie("access_token", token, {
      maxAge: 1000 * 6 * 3600,
      httpOnly: false,
    });
    res.json({ state: "success", data: new_member });
  } catch (err) {
    console.log(`ERROR: cont/signup, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

memberController.login = async (req, res) => {
  try {
    const data = req.body;
    const member = new Member();
    const result = await member.loginData(data);
    const token = await memberController.createToken(result);
    res.cookie("access_token", token, {
      maxAge: 1000 * 6 * 3600,
      httpOnly: false,
    });
    res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR: cont/login, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

memberController.checkAuthentification = async (req, res) => {
  try {
    console.log("GET: cont/checkAuthentification");
    const jwt = req.cookies.access_token;
    assert(jwt, Definer.auth_err3);
    const authenticated_user_data = token.verify(jwt, process.env.SECRET_TOKEN);
    res.json({ state: "success", data: authenticated_user_data });
  } catch (err) {
    console.log(`ERROR: cont/checkAuthentification, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};
