'use strict';

var Trade = require('../../models/trade');
var mailgun = require('../../config/mailgun');

module.exports = {
  handler: function(request, reply) {
    var newTrade = new Trade(request.payload);
    Trade.create(newTrade, function(trade) {
      console.log('ROUTESTRADECREATE trade:', trade);
      Trade.findById(trade._id).populate('item1 item2 user1 user2').exec(function(err, populatedTrade) {
        if(!err) {
          mailgun.tradeOffered(populatedTrade);
          reply();
        } else {
          reply().code(400);
        }
      });
    });
  }
};
