'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var mailgun = require('../config/mailgun');
var User;

var userSchema = mongoose.Schema({
  userName: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true},
  createdAt: {type: Date, default: Date.now, required: true}
});

userSchema.post('save', function(user) {
  // mailgun.signup(user);
});

userSchema.statics.register = function(o, cb) {
  User.findOne({email:o.email}, function(err, user) {
    if (user) { return cb(true); }
    user = new User(o);
    user.password = bcrypt.hashSync(o.password, 8);
    user.save(cb);
  });
};

userSchema.statics.authenticate = function(user, cb) {
  User.findOne({userName:user.userName}, function(err, dbuser) {
    if (!dbuser) {return cb(400);}
    var isGood = bcrypt.compareSync(user.password, dbuser.password);
    if (!isGood) {return cb(400);}
    cb(null, dbuser);
  });
};

User = mongoose.model('User', userSchema);
module.exports = User;
