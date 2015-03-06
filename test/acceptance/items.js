/* jshint expr:true */

'use strict';

var expect = require('chai').expect;
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var Item = require('../../server/models/item')
var it = lab.it;
var beforeEach = lab.beforeEach;
var server = require('../../server/index');
var cp = require('child_process');
var dbname = process.env.MONGO_URL.split('/')[3];
var cookie;

describe('items route', function() {
  beforeEach(function(done) {
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [dbname], {cwd:__dirname + '/../scripts'}, function() {
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
        done();
      });
    });
  });
  describe('post /items', function() {
    it('should create a new item', function(done) {
      var options = {
        method: 'post',
        url:'/items',
        payload:{
          name: 'Ninja Gaiden',
          year: 1988,
          system: 'NES',
          imageUrl: 'ninjagaiden.com',
          tags: 'ninjas, throwing-stars'
        },
        headers: {
          cookie: cookie  
        }
      };
      server.inject(options, function(response) {
        Item.findOne({name:'Ninja Gaiden'}, function(err, item) {
          expect(item.system).to.be.equal('NES');
          expect(item.tags).to.include('ninjas');
          expect(err).to.not.be.ok;
          expect(response.statusCode).to.equal(200);
          done();
        });
      });
    });
  });
  describe('get /users/{userId}', function() {
    it("should retrieve a user's items", function(done) {
      var options = {
        method: 'get',
        url:'/users/000000000000000000000001',
        headers: {
          cookie: cookie  
        }
      };
      server.inject(options, function(response) {
        expect(response.result).to.be.ok;
        done();
      });
    });
  });
  describe('get /items/', function() {
    it("should retrieve available items for swapping", function(done) {
      var options = {
        method: 'get',
        url:'/items',
        headers: {
          cookie: cookie
        }
      };
      server.inject(options, function(response) {
        expect(response.result).to.be.ok;
        expect(response.result[0].name).to.equal('Megaman');
        done();
      });
    });
  });
  describe('get /items/{itemId}', function() {
    it("should retrieve an item page", function(done) {
      var options = {
        method: 'get',
        url:'/items/0000000000000000000000a1',
        headers: {
          cookie: cookie
        }
      };
      server.inject(options, function(response) {
        expect(response.result).to.be.ok;
        expect(response.result.name).to.equal('Tetris');
        done();
      });
    });
  });
});
