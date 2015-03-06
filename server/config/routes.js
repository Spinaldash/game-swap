'use strict';

module.exports = [
  {method: 'get', path: '/{param*}', config: require('../routes/general/static')},

  {method: 'post', path: '/users', config: require('../routes/users/create')},
  {method: 'post', path: '/authenticate', config: require('../routes/users/authenticate')},
  {method: 'get', path: '/status', config: require('../routes/users/status')},
  {method: 'delete', path: '/logout', config: require('../routes/users/logout')},

  {method: 'post', path: '/items', config: require('../routes/items/create')},
  {method: 'get', path: '/users/{userId}', config: require('../routes/items/inventory')},
  {method: 'get', path: '/items', config: require('../routes/items/index')},
  {method: 'get', path: '/items/{itemId}', config: require('../routes/items/show')}
];
