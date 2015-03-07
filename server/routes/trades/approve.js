'use strict';

var Trade = require('../../models/trade');

module.exports = {
  handler: function(request, reply) {
    console.log('TRADE APPROVE PAYLOAD:', request.payload.tradeId);
    Trade.findById(request.payload.tradeId, function(err, trade) {
      console.log('TRADE APPROVE TRADE1:', trade);
      trade.tradeYes(function() {
        console.log('TRADE APPROVE TRADE2:', trade);
        reply();
      });
    });
  }
};
