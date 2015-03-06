'use strict';

var Item = require('../../models/item');

module.exports = {
  handler: function(request, reply) {
    Item.findById(request.params.itemId, function(err, item) {
      reply(item);
    });
  }
};