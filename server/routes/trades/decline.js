'use strict';

var Trade = require('../../models/trade');

module.exports = {
  handler: function(request, reply) {
    console.log('request.payload for decline.js', request.payload);
    Trade.findById(request.payload.tradeId, function(err, trade) {
      trade.tradeNo(function() {
        reply();
      });
    });
  }
};
