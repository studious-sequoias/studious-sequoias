var express        = require('express');
var mongoose       = require('mongoose');
var backController = require('./backend-controller.js')
var app            = express();

mongoose.connect('mongodb://localhost: 27017/tetris', function(err, db) {
	if(!err) {
		console.log('Connected to Mongodb!')
	}
})

app.get('/users', function(req, res) {
	db.userdata.find();
	res.send('hello world')
})

app.listen(3000, function() {
	console.log("Yay, Node server is listening!")
})