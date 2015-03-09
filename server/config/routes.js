'use strict';

module.exports = [
  {method: 'get', path: '/{param*}', config: require('../routes/general/static')},

  {method: 'post', path: '/users', config: require('../routes/users/create')},
  {method: 'post', path: '/authenticate', config: require('../routes/users/authenticate')},
  {method: 'get', path: '/status', config: require('../routes/users/status')},
  {method: 'delete', path: '/logout', config: require('../routes/users/logout')},
  {method: 'get', path: '/users/tradables', config: require('../routes/users/tradables')},        // Show my tradable items

  {method: 'post', path: '/items', config: require('../routes/items/create')},            // New Item
  {method: 'get', path: '/users/{userId}', config: require('../routes/items/inventory')}, // Show My Items
  {method: 'get', path: '/items', config: require('../routes/items/index')},              // Show other items availble for trade
  {method: 'get', path: '/items/{itemId}', config: require('../routes/items/show')},      // Show one item
  {method: 'post', path: '/items/toggleSwap', config: require('../routes/items/toggleSwap')},      // Toggle Swappiness

  {method: 'get', path: '/trades', config: require('../routes/trades/index')},
  {method: 'post', path: '/trades', config: require('../routes/trades/create')},
  {method: 'post', path: '/trades/approve', config: require('../routes/trades/approve')},
  {method: 'post', path: '/trades/decline', config: require('../routes/trades/decline')}

];
