const http = require('http');
const port = process.env.PORT || 4000;
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const studentRoute = require('./api/routes/student')
const userRoute = require('./api/routes/user')
// var mysql = require('mysql');

mongoose.connect('mongodb+srv://kuljeet:Stkh%401895@cluster0.wgq90.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

mongoose.connection.on('error', err => {
    console.log('connection failed');
})

mongoose.connection.on('connected', connected => {
    console.log('connected successfully')
})

/* var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mydb"
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    
  }); */

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(cors());
app.use('/student', studentRoute);
app.use('/user', userRoute)

app.get('/', (req, res, next) => {
    res.send("Hello World")
})
  
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
const server = http.createServer(app);
  
server.listen(port, console.log('app is running...', port))