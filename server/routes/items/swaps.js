'use strict';

var Item = require('../../models/item');

module.exports = {
  handler: function(request, reply) {
    Item.find({userId:request.auth.credentials._id, canSwap: true, isPending:false}, function(err, items) {
      reply(items);
    });
  }
};