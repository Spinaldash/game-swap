'use strict';

module.exports = {
  handler: function(request, reply) {
    reply({userName:request.auth.credentials.userName, userId:request.auth.credentials._id});
  }
};
