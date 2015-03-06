'use strict';

var User = require('../../models/user');
var Joi = require('joi');

module.exports = {
  validate: {
    payload: {
      userName: Joi.string().required(),
      password: Joi.string().required()
    }
  },
  auth:false,
  handler: function(request, reply) {
    User.authenticate(request.payload, function(err, user){
      if (err) {
        reply().code(400);
      }else{
        request.auth.session.set(user);
        reply({userName:user.userName, userId:user._id});
      }
    });
  }
};