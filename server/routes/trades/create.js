'use strict';

var Trade = require('../../models/trade');

module.exports = {
  handler: function(request, reply) {
    var trade = new Trade(request.payload);
    trade.save(function(){
      reply();
    });
  }
};
