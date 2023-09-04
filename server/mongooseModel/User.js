const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const Grid = require('gridfs-stream');
const {GridFsStorage} = require('multer-gridfs-storage');
const multer = require('multer');

// Kết nối tới MongoDB
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Khởi tạo gridfs-stream và gắn nó vào database
let gfs;
db.once('open', () => {
  gfs = Grid(db.db, mongoose.mongo);
  gfs.collection('avatars');
});

// Khởi tạo multer-gridfs-storage để lưu trữ file ảnh
const storage = new GridFsStorage({
  url: process.env.DATABASE_URL,
  file: (req, file) => {
    return { filename: file.originalname,
             bucketName: 'avatars' };
  }
});

// Khởi tạo multer middleware để xử lý file ảnh được gửi lên từ client
const upload = multer({ storage }).single('avatar');


const user = new Schema({
  avatar: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthDate: { type: Date},
  phoneNumber: { type: String},
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
  active: { type: Boolean, default: false },
  role: { type: String, default: 'user' },
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
module.exports = { User, upload, gfs};