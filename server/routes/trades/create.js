'use strict';

var Trade = require('../../models/trade');

module.exports = {
  handler: function(request, reply) {
    console.log('model/trade REQUEST.PAYLOAD:', request.payload);
    var trade = new Trade(request.payload);
    trade.save(function(){
      reply();
    });
  }
};
