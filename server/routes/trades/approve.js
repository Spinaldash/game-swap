'use strict';

var Trade = require('../../models/trade');
var mailgun = require('../../config/mailgun');

module.exports = {
  handler: function(request, reply) {
    Trade.findById(request.payload.tradeId)
    .populate('user1 user2 item1 item2').exec(function(err, populatedTrade) {
      if(!err) {
        populatedTrade.approveTrade(function() {
          mailgun.tradeApproved(populatedTrade);
          reply();
        });
      } else {
        reply().code(400);
      }
    });
  }
};
