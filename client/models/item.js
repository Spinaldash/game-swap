'use strict';

angular.module('game-swap')
  .factory('Item', ['$http', '$rootScope', function($http, $rootScope){
    function create(item) {
      return $http.post('/items', item);
    }
    function showInventory() {
      return $http.get('/users/' + $rootScope.userId);
    }
    function showItem(itemId) {
      return $http.get('/items/' + itemId);
    }
    return {create:create, showInventory:showInventory, showItem:showItem};
  }]);
