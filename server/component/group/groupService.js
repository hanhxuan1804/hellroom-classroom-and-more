const Group = require("./../../mongooseModel/Group");
const { User } = require("./../../mongooseModel/User");

exports.getAllOfUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const groups = await Group.find({
      $and: [
        { $or: [{ owner: userId }, { members: userId }, { coowners: userId }] },
        { isDeleted: false },
      ],
    });
    return res.status(200).json({
      groups,
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
};
exports.getOne = async (req, res) => {
  try {
    const userId = req.user._id;
    const groupId = req.params.id;
    const group = await Group.findOne({ _id: groupId, members: userId });
    if (group.isDeleted) {
      return res.status(400).json({
        error: "No group with this id",
      });
    }
    return res.status(200).json({
      group,
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
};

const generateCode = () => {
  const length = 6;
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

exports.create = async (req, res) => {
  const userId = req.user._id;
  const data = req.body;
  try {
    const isDuplicate = await Group.findOne({ name: data.name, owner: userId });
    if (isDuplicate) {
      return res.status(400).json("You already have a group with this name");
    }
    let code = generateCode();
    while (code in (await Group.find({}))) {
      code = generateCode();
    }
    const group = await Group.create({
      name: data.name,
      description: data.description,
      members: [userId],
      code: generateCode(),
      owner: userId,
      coowners: [],
    });

    return res.status(200).json({
      group,
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
};

exports.join = async (req, res) => {
  const userId = req.user._id;
  const data = req.body;
  try {
    group = await Group.findOne({ code: data.code });
    if (!group || group?.isDeleted) {
      return res.status(400).json({
        error: "No group with this code",
      });
    }
    if (group.members.includes(userId)) {
      return res.status(200).json({
        group,
        message: "You are already a member of this group",
      });
    }
    group.members.push(userId);
    group.members = [...new Set(group.members)];
    const owner = await User.findOne({ _id: group.owner });
    await group.save();
    return res.status(200).json({
      group,
      ownerData: owner,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Something went wrong",
    });
  }
};

exports.getMembers = async (req, res) => {
  const userId = req.user._id;
  const groupId = req.params.id;
  try {
    const group = await Group.findOne({
      _id: groupId,
      $or: [{ owner: userId }, { members: userId }, { coowners: userId }],
    });
    if (!group || group?.isDeleted) {
      return res.status(400).json({
        error: "No group with this id",
      });
    }
    const members = await User.find({ _id: { $in: group.members } });
    return res.status(200).json({
      members,
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
};

exports.update = async (req, res) => {
  const userId = req.user._id;
  const data = req.body;
  const dataGroup = {
    _id: data.groupId,
    name: data.groupName,
    description: data.groupDescription,
    background: data.groupImage,
  };
  try {
    const group = await Group.findOne({ _id: dataGroup._id, owner: userId });
    if (!group || group?.isDeleted) {
      return res.status(400).json({
        error: "No group with this id",
      });
    }
    group.name = dataGroup.name;
    group.description = dataGroup.description;
    group.background = dataGroup.background;
    await group.save();
    return res.status(200).json({
      group,
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
};

exports.delete = async (req, res) => {
  const userId = req.user._id;
  const groupId = req.params.id;
  try {
    const group = await Group.findOne({ _id: groupId, owner: userId, isDeleted: false });
    if (!group) {
      return res.status(400).json({
        error: "No group with this id",
      });
    }
    group.name = "deleted_" + group.name + "_" + group._id;
    group.code = "deleted_" + group.code + "_" + group._id;
    group.isDeleted = true;
    await group.save();
    return res.status(200).json({
      group,
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
};
