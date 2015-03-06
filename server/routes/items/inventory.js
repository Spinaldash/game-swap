'use strict';

var Item = require('../../models/item');

module.exports = {
  handler: function(request, reply) {
    Item.find({userId:request.params.userId}, function(err, items) {
      reply(items);
    });
  }
};