const assert = require("assert");
const { Definer } = require("../lib/Definer");
const { shapeMongooseObjectId } = require("../lib/convert");
const FollowSchema = require("../schema/followSchema");
const Like = require("./Like");
const MemberModel = require("../schema/memberSchema");

class Follow {
  constructor() {
    this.followModel = FollowSchema;
    this.memberModel = MemberModel;
  }

  async followMemberData(member, data) {
    try {
      //checking that do not follow yorself
      assert.ok(member._id != data.other_mb_id, Definer.follow_err1);
      const mb_id = shapeMongooseObjectId(member._id),
        other_mb_id = shapeMongooseObjectId(data.other_mb_id);

      //doest exist user
      const likeModel = new Like();
      const validateUser = await likeModel.validateLikedItem(
        other_mb_id,
        "member"
      );
      assert.ok(validateUser[0], Definer.smth_err1);
      //does exist on follow
      const doesExist = await this.doesExistFollow(mb_id, other_mb_id);
      //Modifying Count following
      let result;
      if (doesExist) {
        result = await this.unsubscribeMember(mb_id, other_mb_id);
        await this.modifyFollowCount(mb_id, other_mb_id, -1);
      } else {
        result = await this.subscribeMember(mb_id, other_mb_id);
        await this.modifyFollowCount(mb_id, other_mb_id, 1);
      }
      //returning result
      return result;
    } catch (err) {
      throw err;
    }
  }

  async doesExistFollow(mb_id, other_mb_id) {
    try {
      const follow = await this.followModel
        .find({
          following_id: mb_id,
          follower_id: other_mb_id,
        })
        .exec();
      return !!follow[0];
    } catch (err) {
      throw err;
    }
  }

  async unsubscribeMember(mb_id, other_mb_id) {
    try {
      const result = await this.followModel
        .findOneAndDelete({ following_id: mb_id, follower_id: other_mb_id })
        .exec();
      return result;
    } catch (err) {
      throw err;
    }
  }
  async subscribeMember(mb_id, other_mb_id) {
    try {
      const follow = new this.followModel({
        following_id: mb_id,
        follower_id: other_mb_id,
      });
      const result = await follow.save();
      return result;
    } catch (err) {
      throw err;
    }
  }

  async modifyFollowCount(mb_id, other_mb_id, modifier) {
    try {
      await this.memberModel
        .findOneAndUpdate(
          { _id: mb_id },
          { $inc: { mb_followings: modifier } },
          { returnDocument: "after" }
        )
        .exec();
      await this.memberModel
        .findOneAndUpdate(
          { _id: other_mb_id },
          { $inc: { mb_followers: modifier } },
          { returnDocument: "after" }
        )
        .exec();
    } catch (err) {
      throw err;
    }
  }
  async getFollowingMembersData(data) {
    try {
      const mb_id = shapeMongooseObjectId(data.mb_id);
      const followers = await this.followModel.aggregate([
        { $match: { following_id: mb_id } },
        {
          $lookup: {
            from: "members",
            localField: "follower_id",
            foreignField: "_id",
            pipeline: [{ $match: { mb_status: "ACTIVE", mb_type: "USER" } }],
            as: "member_data",
          },
        },
        { $unwind: "$member_data" },
        { $skip: (data.page * 1 - 1) * data.limit },
        { $limit: data.limit * 1 },
        { $project: { __v: 0 } },
      ]);
      return followers;
    } catch (err) {
      throw err;
    }
  }

  async getFollowerMembersData(data) {
    try {
      const mb_id = shapeMongooseObjectId(data.mb_id);
      const result = await this.followModel.aggregate([
        { $match: { follower_id: mb_id } },
        {
          $lookup: {
            from: "members",
            localField: "following_id",
            foreignField: "_id",
            pipeline: [{ $match: { mb_status: "ACTIVE", mb_type: "USER" } }],
            as: "member_data",
          },
        },
        { $unwind: "$member_data" },
        { $skip: (data.page * 1 - 1) * (data.limit * 1) },
        { $limit: data.limit * 1 },
      ]);
      return result;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Follow;
