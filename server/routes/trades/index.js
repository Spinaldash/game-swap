'use strict';

var Trade = require('../../models/trade');
var Item = require('../../models/item');

module.exports = {
  handler: function(request, reply) {
    Trade.find({user1:request.auth.credentials._id}).populate('item1 item2 user1 user2').exec(function(err, trades1) {
      Trade.find({user2:request.auth.credentials._id}).populate('item1 item2 user1 user2').exec(function(err, trades2) {
        trades1 = trades1.concat(trades2);
        reply(trades1);
      });
    });
  }
};