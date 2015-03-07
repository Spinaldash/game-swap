/* jshint expr:true */

'use strict';

var expect = require('chai').expect;
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var beforeEach = lab.beforeEach;
var server = require('../../server/index');
var cp = require('child_process');
var dbname = process.env.MONGO_URL.split('/')[3];
var cookie;

describe('users route', function() {
  beforeEach(function(done) {
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [dbname], {cwd:__dirname + '/../scripts'}, function() {
      done();
    });
  });
  describe('post /users', function() {
    it('should register a new user', function(done) {
      var options = {
        method: 'post',
        url:'/users',
        payload:{
          userName: 'Legolas',
          email:'legolas@theShire.com',
          password: '123'
        }
      };
      server.inject(options, function(response) {
        expect(response.statusCode).to.equal(200);
        // expect(response.payload).to.include('Register');
        done();
      });
    });
    it('should NOT re-register an existing user', function(done) {
      var options = {
        method: 'post',
        url:'/users',
        payload:{
          userName: 'BilboBaggins',
          email: "bilbo@theShire.com",
          password: '123'
        }
      };
      server.inject(options, function(response) {
        expect(response.statusCode).to.equal(400);
        done();
      });
    });
  });

  describe('post /authenticate', function() {
    it('should properly authenticate a user', function(done) {
      var options = {
        method: 'post',
        url:'/authenticate',
        payload:{
          userName: 'BilboBaggins',
          password: '123'
        }
      };
      server.inject(options, function(response) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
    it('should NOT authenticate a non-existing user', function(done) {
      var options = {
        method: 'post',
        url:'/authenticate',
        payload:{
          userName: 'Legolas',
          password: '123'
        }
      };
      server.inject(options, function(response) {
        expect(response.statusCode).to.equal(400);
        done();
      });
    });
    it('should NOT authenticate a user - wrong password', function(done) {
      var options = {
        method: 'post',
        url:'/authenticate',
        payload:{
          userName: 'BilboBaggins',
          password: 'wrong'
        }
      };
      server.inject(options, function(response) {
        expect(response.statusCode).to.equal(400);
        done();
      });
    });
  });
  describe('logout', function() {
    it('should log you out', function(done) {
      var options = {
        method: 'post',
        url:'/authenticate',
        payload:{
          userName:'BilboBaggins',
          password: '123'
        }
      };
      server.inject(options, function(response) {
        cookie = response.headers['set-cookie'][0].match(/peanutbutter=[^;]+/)[0];
        var options = {
          method: 'delete',
          url:'/logout',
          headers: {
            cookie: cookie  
          }
        };
        server.inject(options, function(response) {
          expect(response.statusCode).to.equal(200);
          done();
        });
      });
    });
  });
});
