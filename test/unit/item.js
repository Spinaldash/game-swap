/* jshint expr:true */
'use strict';

var expect = require('chai').expect;
var _ = require('lodash');
var Item = require('../../server/models/item');
var User = require('../../server/models/user');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var cp = require('child_process');
var dbname = process.env.MONGO_URL.split('/')[3];
var beforeEach = lab.beforeEach;
require('../../server/index');

describe('Item', function() {

  beforeEach(function(done) {
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [dbname], {cwd:__dirname + '/../scripts'}, function() {
      done();
    });
  });

  describe('Item', function() {
    it('should create an item', function(done) {
      Item.findOne({name: 'Tetris'}, function(err, item) {
        expect(item.name).to.equal('Tetris');
        expect(item.year).to.be.a('number');
        expect(item.year).to.equal(1985);
        expect(item.system).to.equal('Gameboy');
        expect(item.imageUrl).to.equal('http://tetris.com');
        expect(item.createdAt).to.be.instanceof(Date);
        expect(item.userId).to.be.ok;
        expect(item).to.be.ok;
        expect(item.tags).to.include('2d');
        expect(item.tags).to.be.instanceof(Array);
        done();
      });
    });
    it('should find an item', function(done) {
      Item.findOne({name: 'Tetris'}, function(err, item) {
        expect(item.name).to.equal('Tetris');
        expect(item.year).to.be.a('number');
        expect(item.year).to.equal(1985);
        expect(item.system).to.equal('Gameboy');
        expect(item.imageUrl).to.equal('http://tetris.com');
        expect(item.createdAt).to.be.instanceof(Date);
        expect(item.userId).to.be.ok;
        expect(item).to.be.ok;
        expect(item.tags).to.include('2d');
        expect(item.tags).to.be.instanceof(Array);
        done();
      });
    });
    it('should swap the items', function(done) {
      Item.findById("0000000000000000000000a1", function(err, item1) {
        Item.findById("0000000000000000000000a2", function(err, item2) {
          var item1id = item1.userId;
          var item2id = item2.userId;
          item1.swap(item2, function(){
            Item.findById("0000000000000000000000a1", function(err, item1b) {
              Item.findById("0000000000000000000000a2", function(err, item2b) {
                expect(item1b.userId).to.deep.equal(item2id);
                expect(item2b.userId).to.deep.equal(item1id);
                expect(item1b.canSwap).to.not.be.ok;
                expect(item2b.canSwap).to.not.be.ok;
                done();
              });
            });
          });
        });
      });
    });
  });
});
