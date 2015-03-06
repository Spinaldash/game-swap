'use strict';

var Item = require('../../server/models/item');
var mongoose = require('mongoose');

var tradeSchema = mongoose.Schema({
  item1: {type: mongoose.Schema.ObjectId, ref: 'Item', required: true},
  item2: {type: mongoose.Schema.ObjectId, ref: 'Item', required: true},
  createdAt: {type: Date, default: Date.now, required: true},
  completedAt: Date,
  isCompleted: {type: Boolean, default: false, required: true},
  isSuccess: {type: Boolean, default: false, required: true}
});

tradeSchema.methods.tradeYes = function(cb) {
  this.completedAt = new Date();
  this.isCompleted = this.isSuccess = true;
  var item2id = this.item2;
  Item.findById(this.item1, function(err, item1) {
    Item.findById(item2id, function(err, item2) {
      item1.swap(item2, cb);
    });
  });
};

tradeSchema.methods.tradeNo = function(cb) {
  this.completedAt = new Date();
  this.isCompleted = true;
  this.isSuccess = false;
  var item2id = this.item2;
  Item.findById(this.item1, function(err, item1) {
    Item.findById(item2id, function(err, item2) {
      item1.isPending = item2.isPending = false;
      item2.save(function() {
        item1.save(function() {
          cb();
        });
      });
    });
  });
};

module.exports = mongoose.model('trade', tradeSchema);
