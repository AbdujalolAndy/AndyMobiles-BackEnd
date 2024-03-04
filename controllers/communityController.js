const assert = require("assert");
const Community = require("../modals/Community");
const Definer = require("../lib/Definer");

const communityController = module.exports;

communityController.createPost = async (req, res) => {
  try {
    console.log(`POST: cont/createPost`);
    assert(req.member, Definer.auth_err5);
    const community = new Community();
    const result = await community.createPostData(
      req.member,
      req.file,
      req.body
    );
    res.json({ state: "success", value: result });
  } catch (err) {
    console.log(`ERROR: cont/createPost, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

communityController.getTargetBlogs = async (req, res) => {
  try {
    console.log(`GET: cont/getTargetBlogs`);
    const queries = req.query,
      community = new Community(),
      result = await community.getTargetBlogsData(queries);
    res.json({ state: "success", value: result });
  } catch (err) {
    console.log(`ERROR: cont/getTargetBlogs, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};
