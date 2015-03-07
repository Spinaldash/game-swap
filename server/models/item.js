'use strict';

var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
  name: {type: String, required: true},
  year: {type: Number, required: true},
  system: {type: String, required: true},
  imageUrl: {type: String, required: true},
  tags: [String],
  canSwap: {type: Boolean, default: true, required: true},
  isPending: {type: Boolean, default: false, required: true},
  userId: {type: mongoose.Schema.ObjectId, ref: 'User', required: true},
  createdAt: {type: Date, default: Date.now, required: true}
});

itemSchema.methods.swap = function(swapitem, cb) {
  var placeholder = this.userId;
  this.userId = swapitem.userId;
  swapitem.userId = placeholder;
  this.isPending = swapitem.isPending = false;
  this.canSwap = swapitem.canSwap = false;
  this.save(function(){
    swapitem.save(cb);
  });
};

itemSchema.pre('save', function(next) {
  if(this.isNew && this.tags.length) {
    this.tags = this.tags[0].split(',')
    .map(function(s){
      return s.trim().toLowerCase();
    });
  }
  next();
});

module.exports = mongoose.model('Item', itemSchema);
