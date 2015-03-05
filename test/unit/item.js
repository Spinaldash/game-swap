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
var beforeEach = lab.beforeEach;
require('../../server/index');

describe('Item', function() {
  beforeEach(function(done) {
    Item.remove();
    User.remove(function() {
      var user = new User({userName: 'BilboBaggins', email: 'bilbo@theShire.com', password: '123'});
      User.register(user, done);
    });
  });

  describe('Item', function() {
    it('should create am item', function(done) {
      var tags = ['ring','epic','tiring','DoOmandGloOm'];
      User.findOne({email: 'bilbo@theShire.com'}, function(err, user) {
        var item = new Item({name: 'Tetris', year: 1985, system: 'Gameboy', imageUrl: 'tetris.com', tags: tags, userId: user._id});
        expect(item.name).to.equal('Tetris');
        expect(item.year).to.be.a('number');
        expect(item.year).to.equal(1985);
        expect(item.system).to.equal('Gameboy');
        expect(item.imageUrl).to.equal('tetris.com');
        expect(item.createdAt).to.be.instanceof(Date);
        expect(item.userId).to.be.ok;
        expect(item).to.be.ok;
        expect(item.tags).to.include('epic');
        expect(item.tags).to.be.instanceof(Array);
        done();
      });
    });
  });
});
