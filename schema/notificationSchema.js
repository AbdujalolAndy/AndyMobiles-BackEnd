const { Schema, model } = require("mongoose");

const notifySchema = new Schema(
  {
    notify_sender: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    notify_reciever: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    notify_subject: {
      type: String,
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
