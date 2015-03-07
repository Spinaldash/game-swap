/* jshint quotmark: false */

'use strict';

var Mailgun = require('mailgun').Mailgun;
var mg = new Mailgun(process.env.MG_KEY);
var sender = 'noreply@game-swap.com';

var signupSubject = 'Welcome to Game-Swap!';
var signupText = "Hi " + user.userName +
      "!\n\nYou've signed up to Game-Swap!  Game-Swap is an easy way to take games you own, and trade them for games you want.\n\n" + 
      "Log in and start trading now!\n\n--The Game-Swap Team";


var emailCB = function(err) {
  console.log('emailCB Called.');
  if(err) {
    console.log('Email Sending Failed. err:', err);
  } else {
    console.log('Email Sending Succeeded!');
  }
};

module.exports = {
  signup: function(user) {
    console.log('*****USER signing up:', user.email);
    console.log('signupEmail called');
    mg.sendText(sender, user.email, signupSubject, signupText, emailCB);
  }
};
