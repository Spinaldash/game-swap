'use strict';

module.exports = [
  {method: 'get', path: '/{param*}', config: require('../routes/general/static')},

  {method: 'post', path: '/users', config: require('../routes/users/create')},
  {method: 'post', path: '/authenticate', config: require('../routes/users/authenticate')},
  {method: 'get', path: '/status', config: require('../routes/users/status')},
  {method: 'delete', path: '/logout', config: require('../routes/users/logout')},

  {method: 'post', path: '/items', config: require('../routes/items/create')},            // New Item
  {method: 'get', path: '/users/{userId}', config: require('../routes/items/inventory')}, // Show My Items
  {method: 'get', path: '/items/swaps', config: require('../routes/items/swaps')}, // Show My Swappable Items
  {method: 'get', path: '/items', config: require('../routes/items/index')},              // Show other items availble for trade
  {method: 'get', path: '/items/{itemId}', config: require('../routes/items/show')},      // Show one item

  {method: 'post', path: '/trades', config: require('../routes/trades/create')}

];
