var fs = require('fs');
var path = require('path');
var db = require('./server.js');
var User = require('./backend-controller.js').User;

var filePath = path.join(__dirname, '/data/scores.json');

fs.readFile(filePath, { encoding: 'utf-8' }, function(err, data) {
  if (err) {
    console.error('An error occurred opening file:', filePath);
    throw err;
  }

  var users = JSON.parse(data);
  users.forEach(function (user) {
    var newUser = new User(user);
    newUser.save(function (err) {
      if (err) {
        console.error('An error occurred while saving User');
        throw err;
      }
    });
  });
  
});