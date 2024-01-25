const Notification = require("../modals/notification");

const notificationController = module.exports;

notificationController.getNotifications = async (req, res) => {
  try {
    console.log("GET: cont/getNotifications");
    const notify = new Notification();
    const notifications = await notify.getAllNotifications(req.member.mb_nick);
    res.render("notifications", {
      member: req.member,
      notifications: notifications,
    });
  } catch (err) {
    console.log("ERROR: cont/getNotifications");
    res.json({ state: "fail", message: err.message });
  }
};
