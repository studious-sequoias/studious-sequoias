var express        = require('express');
var mongoose       = require('mongoose');
//var backController = require('./backend-controller.js')
var app            = express();

mongoose.connect('mongodb://localhost:27017/tetris');

// Connect to database
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

app.get('/', function(req,res){
	hello
})

// Define userSchema


var userSchema = mongoose.Schema({
  name: String, 
  score: Number
});

// Create model
var User = mongoose.model("User", userSchema);

var max = new User({name: 'Max', score: 999});

//save user to mongodb
max.save(function (err, max) {
	if(err) return console.error(err);
})

User.find(function(err, users) {
	if(err) return console.error(err);
})
console.log(max.name,"******")
console.log(max.score,"$$$$$$$")
//app.use(express.static(__dirname + '/../client'));

app.get('/users', function(req, res) {
	User.findOne({'name': 'Max'}, function(err, users) {
		res.send(users)
	})
})

app.listen(3000, function() {
	console.log("Yay, Node server is listening!")
})