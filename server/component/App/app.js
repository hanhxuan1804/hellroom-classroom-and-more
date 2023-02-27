require('dotenv').config();
global.publicPath = __dirname + '../../public';
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('../passport');
const cors = require('cors');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const fs = require('fs');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    exports.db = mongoose.connection;
    console.log('Connection to database successful!');
}).catch((err)=>{
    console.log('Connection to database failed!');
    console.log(err);
});

// // Init gfs
// const conn = mongoose.connection;
// let gfs;
// conn.once('open', () => {
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection('uploads');
// });

// exports.gfs = gfs;


const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false ,limit: '50mb'}));

// parse application/json
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors()); 

// Passport middleware
app.use(passport.initialize());

require('./router')(app);

const http = require('http');
const server = http.Server(app);
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is running on localhost:${port}`);
});

