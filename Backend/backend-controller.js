// import mongooose
var mongoose = require('mongoose');

// define model
var Users = mongoose.model('Users', {name:String, score: Number})

module.exports.create = function(req,res) {
	var user = new User();
	user.save(function(err) {
		if(err) return handleError(err)
	})
}

module.exports.list = function(req, res) {
	Users.find({}, function(err, results) {
		res.json(results)
	})
}