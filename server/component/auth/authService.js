const niv = require("../../public/Validator");
const Validator = niv.Validator;
const { User } = require("../../mongooseModel/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_CLIENT_REDIRECT_URI
);


exports.googleLogin = async (req, res) => {
  const code = req.body.code;
  if (!code) {
    return res.status(400).json({
      error: "Code is required",
    });
  }
  try {
    const response = await client.getToken(code);
    const { tokens } = response;
    const { id_token } = tokens;
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { email_verified, email, given_name, family_name, picture } = ticket.getPayload();
    if (email_verified) {
        const user = await User.findOne({ email });
        if (user) {
          const token = jwt.sign({ user: user }, process.env.JWT_SECRET, {
            expiresIn: "7d",
          });
          user.password = undefined;
          user.active = undefined;
          user.__v = undefined;

          return res.status(200).json({
            token,
            user: user,
          });
        }
        const password = email + process.env.JWT_SECRET;
        const newUser = new User({
          _id: new mongoose.Types.ObjectId(),
          email,
          password,
          firstName: family_name,
          lastName: given_name,
          avatar: picture,
          active: true,
        });
        await newUser.save();
        const token = jwt.sign({ user: newUser }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });
        newUser.password = undefined;
        newUser.active = undefined;
        newUser.__v = undefined;
        return res.status(200).json({
          token,
          user: newUser,
        });

    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Google login failed. Try again",
    });
  }


    
};

exports.verify = async (req, res) => {
  const v = new Validator(req.body, {
    code: "required|minLength:24|maxLength:24",
  });
  const matched = await v.check();
  if (!matched) {
    return res.status(422).send(v.errors);
  }
  try {
    const user = await User.findOne({ _id: req.body.code });
    if (!user) {
      return res.status(400).send({
        message: "Invalid code",
      });
    }
    user.active = true;
    await user.save();
    return res.status(200).send({
      message: "Successfully",
    });
  } catch (err) {
    return res.status(400).send({
      message: err.message,
      data: err,
    });
  }
};

exports.register = async (req, res) => {
  const v = new Validator(req.body, {
    email: "required|email|minLength:4|maxLength:100|unique:User,email",
    password: "required|minLength:6|maxLength:100",
    firstName: "required|minLength:2|maxLength:100",
    lastName: "required|minLength:2|maxLength:100",
  });
  const matched = await v.check();
  if (!matched) {
    return res.status(422).send(v.errors);
  }
  try {
    const userObject = new User({
      _id: new mongoose.Types.ObjectId(),
      email: req.body.email,
      active: true,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SERVER_EMAIL,
        pass: process.env.SERVER_EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: process.env.SERVER_EMAIL,
      to: userObject.email,
      subject: "Active your account",
      html: `
      <div
        style="display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;"
        >
      <h1
        style="text-align: center;
        font-size: 30px;
        font-weight: 600;"        
      >Click this to active your account</h1>
      <a 
      style="background-color: #4CAF50; /* Green */
        border: none;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;"
         href="http://localhost:3000/auth/active?code=${userObject._id}">Active</a>
         </div>`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log("mail error: ", err);
        return res.status(400).json({
          message: "Something went wrong! Please try again later",
        });
      } else {
        console.log("Email sent: " + info.response);
        userObject.save();
        return res.status(201).json({
          message: "Successfully",
        });
      }
    });
  } catch (err) {
    return res.status(400).send({
      message: err.message,
      data: err,
    });
  }
};

exports.login = async (req, res) => {
  const v = new Validator(req.body, {
    email: "required|email|minLength:4|maxLength:100",
    password: "required|minLength:6|maxLength:100",
  });
  const matched = await v.check();
  if (!matched) {
    return res.status(422).send(v.errors);
  }
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send({
        message: "Email or password is incorrect",
      });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).send({
        message: "Email or password is incorrect",
      });
    }
    user.password = undefined;
    const token = jwt.sign({ user: user }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.status(200).send({
      token: token,
      user: user,
    });
  } catch (err) {
    return res.status(400).send({
      message: err.message,
      data: err,
    });
  }
};

exports.profile = (req, res) => {
  let user = req.user;
  user.password = undefined;
  return res.status(200).send({
    user: user,
  });
};
