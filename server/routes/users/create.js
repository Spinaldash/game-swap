'use strict';

var User = require('../../models/user');
var Joi = require('joi');
var mailgun = require('../../config/mailgun');

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
    User.register(request.payload, function(err, user){
      if(!err) {
        mailgun.signup(user);
        reply();
      } else {
        reply().code(400);
      }
    });
  }
};