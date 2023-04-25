const { User } = require("../../mongooseModel/User");
const niv = require("../../public/Validator");
const mongoose = require("mongoose");
const db = require("../../component/App/app");
const Grid = require("gridfs-stream");
const Validator = niv.Validator;

exports.updateProfile = async function (req, res) {
  const v = new Validator(req.body, {
    firstName: "required|minLength:2|maxLength:100",
    lastName: "required|minLength:2|maxLength:100",
    email: "required|email|minLength:4|maxLength:100",
    phoneNumber: "minLength:10|maxLength:10",
    birthDate: "minLength:10|maxLength:10",
  });
  const matched = await v.check();
  if (!matched) {
    return res.status(422).send(v.errors);
  }
  User.updateOne(
    {
      _id: req.user._id,
    },
    {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        birthDate: req.body.birthDate,
      },
    },
    function (err, result) {
      if (err) {
        res.status(500).send({
          message: "Error updating user",
        });
      } else {
        res.send(result);
      }
    }
  );
};

exports.uploadAvatar = (req, res) => {
  User.updateOne(
    {
      _id: req.user._id,
    },
    {
      $set: {
        avatar: `${process.env.API_URL}/user/avatar/${req.file.id}`
      },
    },
    function (err, result) {
      if (err) {
        res.status(500).send({
          message: "Error updating user",
        });
      } else {
        res.status(200).send({
          avatar: `${process.env.API_URL}/user/avatar/${req.file.id}`
        });
      }
    }
  );
};

exports.getAvatar = async (req, res) => {
  try {
    const id = mongoose.Types.ObjectId(req.params.id);
    const bucket =  new mongoose.mongo.GridFSBucket(db.db, {
      bucketName: 'avatars'
    });
    const downloadStream = bucket.openDownloadStream(id);
    downloadStream.pipe(res);
  } catch (err) {
    return res.status(422).send({
      message: err.message,
    });
  }
};
