'use strict';

module.exports = {
  handler: function(request, reply) {
    console.log(request.auth.credentials);
    reply({userName:request.auth.credentials.userName, userId:request.auth.credentials._id});
  }
};
