const Group = require("./../../mongooseModel/Group");

exports.getAllOfUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const groups = await Group.find({ $or: [{ owner: userId }, { members: userId }, {coowners: userId}] });
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
