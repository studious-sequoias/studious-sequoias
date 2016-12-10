// import mongooose
var mongoose = require('mongoose');

// define model
var User = mongoose.model("User", {
	name: String,
	score: Number
});

module.exports.listUsers = function(req, res) {
	User.find({}, function(err, users) {
		res.send(users)
	})
}
// define create/list functions
module.exports.createUser = function(req,res) {
	console.log(req.body)
	function createUser(name,score){
		//create model
		var user = new User({name: name, score: score});
		//save user to mongodb
		user.save(function (err, max) {
			if(err) return console.error(err);
		});
	}

	createUser(req.body.name, req.body.score)
	
	res.sendStatus(201);
}



