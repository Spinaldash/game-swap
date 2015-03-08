// /* jshint expr:true */

// 'use strict';

// var expect = require('chai').expect;
// var Lab = require('lab');
// var lab = exports.lab = Lab.script();
// var describe = lab.describe;
// var it = lab.it;
// var beforeEach = lab.beforeEach;

// var mailgun = require('../../server/config/mailgun');
// var User = require('../../server/models/user')

// var server = require('../../server/index');
// var cp = require('child_process');
// var dbname = process.env.MONGO_URL.split('/')[3];
// var cookie;

// describe('mailgun', function() {
//   beforeEach(function(done) {
//     cp.execFile(__dirname + '/../scripts/clean-db.sh', [dbname], {cwd:__dirname + '/../scripts'}, function() {
//       done();
//     });
//   });
//   describe('mailer', function() {
//     it('should send signup email', function(done) {
//       User.findById('000000000000000000000003', function(err, user) {
//         console.log('*******acceptance mail USER:', user);
//         mailgun.signup(user);
//         done();
//       });
//     });
//   });
// });
