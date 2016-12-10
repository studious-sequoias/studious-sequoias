var express           = require('express');
var mongoose          = require('mongoose');
var backEndController = require('./backend-controller.js');
var bodyParser        = require('body-parser');
var app               = express();

require('dotenv').load();

mongoose.connect('mongodb://localhost:27017/tetris');

// Connect to database
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

//get static html page
app.use(express.static(__dirname + '/../client'));

// just for the request body data
app.use(bodyParser.json());

app.get('/api/users', backEndController.listUsers);
app.post('/api/users', backEndController.createUser);

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Yay, Node server is listening!');
});