'use strict';

var Joi = require('joi');
var Item = require('../../models/item');

module.exports = {
  validate: {
    payload: {
      name: Joi.string().required(),
      year: Joi.number().min(1950).required(),
      system: Joi.string().required(),
      imageUrl: Joi.string().required(),
      tags: Joi.string()
    }
  },
  handler: function(request, reply) {
    request.payload.userId = request.auth.credentials._id;
    var item = new Item(request.payload);
    item.save(function(){
      reply();
    });
  }
};