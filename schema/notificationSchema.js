const { Schema, model } = require("mongoose");

const notifySchema = new Schema(
  {
    notify_sender: {
      type: String,
      required: true,
    },
    notify_sender_image:{
      type:String
    },
    notify_reciever: {
      type: String || Array,
      required: true,
    },
    notify_context: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Notification", notifySchema);
