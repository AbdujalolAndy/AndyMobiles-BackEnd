const assert = require("assert");
const Member = require("../modals/Member");
const token = require("jsonwebtoken");
const Definer = require("../lib/Definer");

const memberController = module.exports;

memberController.home = async (req, res) => {
  try {
    console.log("GET: cont/home");
    res.render("home", { member: req.member });
  } catch (err) {
    console.log("ERROR: cont/home");
    res.json({ state: "fail", message: err.message });
  }
};

memberController.getAllCompanies = async (req, res) => {
  try {
    console.log("GET: cont/homePage");
    const member = new Member();
    const allCompanies = await member.getAllCompaniesData(req.query);
    res.render("all-companies", {
      companies: allCompanies,
      member: req.member,
    });
  } catch (err) {
    console.log(`ERROR: cont/homepage, ${err.message}`);
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

memberController.memberUpdate = async (req, res) => {
  try {
    console.log("POST: cont/memberUpdate");
    const data = req.body;
    const member = new Member();
    const result = await member.memberUpdateData(data);
    res.json({ state: "sucess", value: result });
  } catch (err) {
    console.log("ERROR: cont/memberUpdate");
    res.json({ state: "fail", message: err.message });
  }
};

memberController.register = async (req, res) => {
  try {
    console.log("GET: cont/register");
    res.render("register");
  } catch (err) {
    console.log(`ERROR: cont/register, ${err.message}`);
    res.json({ state: "fail", message: err.message });
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
    req.session.member = new_member;
    res.redirect("/admin");
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
    req.session.member = result;
    res.redirect("/admin");
  } catch (err) {
    console.log(`ERROR: cont/login, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

memberController.signupJson = async (req, res) => {
  try {
    console.log("POST: cont/signupJson");
    const data = req.body;
    const member = new Member();
    const result = await member.signupData(data);
    const token = await this.createToken(result);
    assert.ok(token, Definer.auth_err3);
    res.cookie("access_token", token, {
      maxAge: 1000 * 60 * 360,
      httpOnly: false,
    });
    res.json({ state: "success", value: result });
  } catch (err) {
    console.log(`ERROR: cont/signupJson, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

memberController.loginJson = async (req, res) => {
  try {
    console.log("GET: cont/loginJson");
    const data = req.body;
    const member = new Member();
    const result = await member.loginData(data);
    assert.ok(result, Definer.auth_err1);
    const token = await memberController.createToken(result);
    res.cookie("access_token", token, {
      maxAge: 1000 * 60 * 360,
      httpOnly: false,
    });
    res.json({ state: "success", value: result });
  } catch (err) {
    console.log(`ERROR: cont/loginJson, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

memberController.logout = async (req, res) => {
  try {
    res.cookie("access_token", null, { maxAge: 0, httpOnly: false });
    res.redirect("/admin/register");
  } catch (err) {
    console.log("ERROR: cont/logout");
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

memberController.memberRetrieveEjs = (req, res, next) => {
  if (req.cookies.access_token) {
    req.member = token.verify(
      req.cookies.access_token,
      process.env.SECRET_TOKEN
    );
    next();
  } else {
    res.render("404error");
  }
};
memberController.memberRetrieve = (req, res, next) => {
  if (req.cookies.access_token) {
    const member = token.verify(
      req.cookies.access_token,
      process.env.SECRET_TOKEN
    );
    req.member = member;
    next();
  }else{
    next()
  }
};
