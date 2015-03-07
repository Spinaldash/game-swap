'use strict';

var Trade = require('../../models/trade');
var Item = require('../../models/item');

module.exports = {
  handler: function(request, reply) {
    var trade = new Trade(request.payload);
    Item.findById(request.payload.item1, function(err, item1) {
      Item.findById(request.payload.item2, function(err, item2) {
        item1.isPending = item2.isPending = true;
        item1.save(function() {
          item2.save(function() {
            trade.save(function() {
              reply();
            });
          });
        });
      });
    });
  }
};
