'use strict';

angular.module('game-swap')
  .factory('Trade', ['$http', function($http){
    function show() {
      return $http.get('/trades');
    }
    function approveTrade(tradeId) {
      return $http.post('/trades/approve', {tradeId:tradeId});
    }
    function declineTrade(tradeId) {
      return $http.post('/trades/decline', {tradeId:tradeId});
    }

    return {
      show:show,
      approveTrade:approveTrade,
      declineTrade:declineTrade
    };
  }]);
