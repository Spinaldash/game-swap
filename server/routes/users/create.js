'use strict';

var User = require('../../models/user');
var Joi = require('joi');

module.exports = {
  validate: {
    payload: {
      userName: Joi.string().required(),
      password: Joi.string().required(),
      email: Joi.string().required()
    }
  },
  auth:false,
  handler: function(request, reply) {
    User.register(request.payload, function(err){
      reply().code(err ? 400 : 200);
    });
  }
};