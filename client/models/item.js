'use strict';

angular.module('game-swap')
  .factory('Item', ['$http', '$state', '$rootScope', function($http, $state, $rootScope){
    function create(item) {
      return $http.post('/items', item);
    }
    function showInventory() {
      return $http.get('/users/' + $rootScope.userId);
    }
    function show(itemId) {
      return $http.get('/items/' + itemId);
    }
    function getIndex() {
      return $http.get('/items');
    }
    function getMyTradables() {
      return $http.get('/users/tradables');
    }
    function trade(item1, item2, user1, user2) {
      return $http.post('/trades', {item1:item1, item2:item2, user1:user1, user2:user2});
    }
    function toggleCanSwap() {
      return $http.post('/items/toggleSwap', {itemId: $state.params.itemId});
    }
    return {
      create:create,
      showInventory:showInventory,
      show:show,
      getIndex:getIndex,
      getMyTradables:getMyTradables,
      trade:trade,
      toggleCanSwap:toggleCanSwap
    };
  }]);
