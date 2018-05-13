var db = require('../database-mongo/index.js')
var express = require('express');
var bodyParser = require('body-parser');
var bcrypt  = require('bcrypt')
var app = express();
// ---------------------------------------------------------------
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// -----------------------hash------------------------------------
app.post('/login', function (req, res) {
	var email = req.body.email
	var pass = req.body.password
	bcrypt.hash(pass,10,function(err,hash) {
		if(err){
			console.log('error while hashing',err)
          }
		db.save({
			email:email,
			passwor:hash
		},function(err,data){
			if(err){
				console.log('error while saving',err)
			}
			console.log(data)
		})
	})
});
// --------------------------COMPARE--------------------------------
app.post('/signup',function(req,res){
	var email = req.body.email
	var pass = req.body.password
	db.user.findOne({email:email},function(err,data){
		if(err){
			console.log(err)
		}
		bcrypt.compare(pass,data.password,function(err,match){
			if(match){
				console.log(match,'valid access')
			}
			console.log('try anothe password')
		})
	})
	})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});