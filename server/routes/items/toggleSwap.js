'use strict';

var Item = require('../../models/item');

module.exports = {
  handler: function(request, reply) {
    Item.findById(request.payload.itemId, function(err, item) {
      item.canSwap = !item.canSwap;
      item.save(function() {
        reply(item.canSwap);
      });
    });
  }
};