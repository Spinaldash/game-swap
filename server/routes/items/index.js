'use strict';

var Item = require('../../models/item');

module.exports = {
  handler: function(request, reply) {
    Item.find({userId:{$ne: request.auth.credentials._id}, canSwap: true}, function(err, items) {
      reply(items);
    });
  }
};