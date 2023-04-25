const Group = require("./../../mongooseModel/Group");

exports.getAll = async (req, res) => {
  try {
    const userId = req.user._id;
    const groups = await Group.find({ members: userId });
    return res.status(200).json({
      groups,
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
};
