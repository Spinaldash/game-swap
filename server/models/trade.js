'use strict';

var Item = require('../../server/models/item');
var mongoose = require('mongoose');

var tradeSchema = mongoose.Schema({
  item1: {type: mongoose.Schema.ObjectId, ref: 'Item', required: true},
  item2: {type: mongoose.Schema.ObjectId, ref: 'Item', required: true},
  user1: {type: mongoose.Schema.ObjectId, ref: 'User'},
  user2: {type: mongoose.Schema.ObjectId, ref: 'User'},
  createdAt: {type: Date, default: Date.now, required: true},
  completedAt: Date,
  isCompleted: {type: Boolean, default: false, required: true},
  isSuccess: {type: Boolean, default: false, required: true}
});

tradeSchema.statics.create = function(trade, cb) {
  Item.findById(trade.item1, function(err, item1) {
    Item.findById(trade.item2, function(err, item2) {
      item1.isPending = item2.isPending = true;
      item1.save(function() {
        item2.save(function() {
          trade.save(function() {
            cb(trade);
          });
        });
      });
    });
  });
};

tradeSchema.methods.approveTrade = function(cb) {
  var trade = this;
  this.completedAt = new Date();
  this.isCompleted = this.isSuccess = true;
  var item2id = this.item2;
  Item.findById(this.item1, function(err, item1) {
    Item.findById(item2id, function(err, item2) {
      item1.isPending = item2.isPending = false;
      item1.swap(item2, function() {
        item1.save(function() {
          item2.save(function() {
            trade.save(cb);
          });
        });
      });
    });
  });
};

tradeSchema.methods.declineTrade = function(cb) {
  var trade = this;
  this.completedAt = new Date();
  this.isCompleted = true;
  this.isSuccess = false;
  var item2id = this.item2;
  Item.findById(this.item1, function(err, item1) {
    Item.findById(item2id, function(err, item2) {
      item1.isPending = item2.isPending = false;
      item1.save(function() {
        item2.save(function() {
          trade.save(cb);
        });
      });
    });
  });
};

module.exports = mongoose.model('Trade', tradeSchema);
