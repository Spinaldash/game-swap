'use strict';

var User = require('../../models/user');
var Item = require('../../models/item');

module.exports = {
  handler: function(request, reply) {
    Item.findById(request.params.itemId, function(err, item) {
      User.findById(item.userId, function(err, user) {
        reply({item:item, userName:user.userName});
      });
    });
  }
};
