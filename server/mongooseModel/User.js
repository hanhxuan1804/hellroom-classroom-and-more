const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');


const user = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
  status: { type: String, default: 'active' },
  deleted: { type: Boolean, default: false },
});

user.pre('save', async function (next) {
    const user = this;
    if(!user.isModified('password')) return next();
    const salt = await bcrypt.genSalt(9);
    const hash = await bcrypt.hash(user.password, salt);
    this.password = hash;
    next();
});

const User = mongoose.model('User', user);
module.exports = User;