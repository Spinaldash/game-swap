/* jshint expr:true */
'use strict';

var expect = require('chai').expect;
var _ = require('lodash');
var Trade = require('../../server/models/trade');
var Item = require('../../server/models/item');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var cp = require('child_process');
var dbname = process.env.MONGO_URL.split('/')[3];
var beforeEach = lab.beforeEach;

describe('Trade', function() {

  beforeEach(function(done) {
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [dbname], {cwd:__dirname + '/../scripts'}, function() {
      done();
    });
  });

  describe('Trade', function() {
    it('approveTrade should complete a trade.', function(done) {
      Trade.findById("000000000000000000000a01", function(err, trade) {
        Item.findById(trade.item1, function(err, item1) {
          Item.findById(trade.item2, function(err, item2) {
            var item1id = item1.userId;
            var item2id = item2.userId;

            trade.approveTrade(function(){
              Item.findById(trade.item1, function(err, item1a) {
                Item.findById(trade.item2, function(err, item2a) {
                  expect(trade.isCompleted).to.be.ok;
                  expect(trade.isSuccess).to.be.ok;
                  expect(trade.completedAt).to.be.ok;

                  expect(item1a.isPending).to.not.be.ok;
                  expect(item2a.isPending).to.not.be.ok;
                  expect(item1a.canSwap).to.not.be.ok;
                  expect(item2a.canSwap).to.not.be.ok;
                  expect(item1a.userId).to.deep.equal(item2id);
                  expect(item2a.userId).to.deep.equal(item1id);

                  done();
                });
              });     
            });
          });
        });
      });
    });
    it('declineTrade should reject a trade.', function(done) {
      Trade.findById("000000000000000000000a01", function(err, trade) {
        Item.findById(trade.item1, function(err, item1) {
          Item.findById(trade.item2, function(err, item2) {
            var item1id = item1.userId;
            var item2id = item2.userId;

            trade.declineTrade(function(){
              Item.findById(trade.item1, function(err, item1a) {
                Item.findById(trade.item2, function(err, item2a) {
                  expect(trade.isCompleted).to.be.ok;
                  expect(trade.isSuccess).to.not.be.ok;
                  expect(trade.completedAt).to.be.ok;

                  expect(item1a.isPending).to.not.be.ok;
                  // expect(item2a.isPending).to.not.be.ok;
                  // expect(item1a.userId).to.not.deep.equal(item2id);
                  // expect(item2a.userId).to.not.deep.equal(item1id);

                  done();
                });
              });     
            });
          });
        });
      });
    });
  });
});
