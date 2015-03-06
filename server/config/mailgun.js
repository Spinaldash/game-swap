'use strict';

var Mailgun = require('mailgun').Mailgun;
var mg = new Mailgun(process.env.MG_KEY);
var sender = 'noreply@game-swap.com';
var signUpText = "You've signed up for Game-Swap!!";

var emailCB = function(err) {
  if(err) {
    console.log('Email Sending Failed. err:', err);
  } else {
    console.log('Email Sending Succeeded!');
  }
};

module.exports = {
  signupEmail: function(user) {
    console.log('*****USER signing up:', user);
    console.log('signupEmail called');
    mg.sendText(sender, user.email, 'Welcome to Game-Swap!', signUpText, emailCB);
  } 
};
