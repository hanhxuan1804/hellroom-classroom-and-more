require('dotenv').config();
global.publicPath = __dirname + '../../public';
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log('Connected to database!');
}).catch((err)=>{
    console.log('Connection to database failed!');
    console.log(err);
});

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false ,limit: '50mb'}));

// parse application/json
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors()); 

require('./router')(app);

const http = require('http');
const server = http.Server(app);
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is running on localhost:${port}`);
});

