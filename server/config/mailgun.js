/* jshint quotmark: false */

'use strict';
var mailingEnabled = false;

var Mailgun = require('mailgun').Mailgun;
var mg = new Mailgun(process.env.MG_KEY);
var sender = 'noreply@game-swap.com';

var signupSubject = 'Welcome to Game-Swap!';
var signupText = function(userName) {
  return "Hi " + userName + "!\n\nYou've signed up to Game-Swap!" +
  "  Game-Swap is an easy way to take games you own, and trade them for games you want.\n\n" +
  "Log in and start trading now!\n\n-- The Game-Swap Team";
};

var tradeOfferedSubject = function(populatedTrade) {
  return "Game-Swap - " + populatedTrade.user1.userName + " wants to trade!";
};
var tradeOfferedText = function(populatedTrade) {
  return "Hi " + populatedTrade.user2.userName + ",\n\n" + 
  populatedTrade.user1.userName + " would like to trade with you.\n\n" +
  "They are interested in your item: " + populatedTrade.item2.name +
  "\nThey are offering: " + populatedTrade.item1.name +
  "\n\n Check out your active trades to accept or decline this offer!" +
  "\n\n -- Game-Swap";
};

var tradeApprovedSubject = function(populatedTrade) {
  return "Game-Swap - " + populatedTrade.user2.userName + " has accepted your trade!";
};
var tradeApprovedText = function(populatedTrade) {
  return "Hi " + populatedTrade.user1.userName + ",\n\n" + 
  populatedTrade.user2.userName + " has accepted your trade!\n\n" +
  "You've traded away " + populatedTrade.item1.name +
  "in exchange for " + populatedTrade.item1.name +
  "!\n\n Your new game is currently not available for swap offers, " +
  "but you can make it available again on its detail page.\n\n" +
  "Thanks for using Game-Swap!" +
  "\n\n -- The Game-Swap Team";
};

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
    if (mailingEnabled) {
      mg.sendText(sender, user.email, signupSubject, signupText(user.userName), emailCB);
    }
  },
  tradeOffered: function(populatedTrade) {
    if (mailingEnabled) {
      mg.sendText(sender, populatedTrade.user2.email, tradeOfferedSubject(populatedTrade), tradeOfferedText(populatedTrade), emailCB);
    }
  },
  tradeApproved: function(populatedTrade) {
    if (mailingEnabled) {
      mg.sendText(sender, populatedTrade.user1.email, tradeApprovedSubject(populatedTrade), tradeApprovedText(populatedTrade), emailCB);
    }
  }
};
