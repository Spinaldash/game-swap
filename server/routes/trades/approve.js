'use strict';

var Trade = require('../../models/trade');

module.exports = {
  handler: function(request, reply) {
    Trade.findById(request.payload.tradeId, function(err, trade) {
      trade.approveTrade(function() {
        reply();
      });
    });
  }
};
