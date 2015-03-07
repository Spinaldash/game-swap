'use strict';

angular.module('game-swap')
  .factory('Trade', ['$http', function($http){
    function show() {
      return $http.get('/trades');
    }
    function tradeYes(tradeId) {
      return $http.post('/trades/approve', tradeId);
    }
    function tradeNo(tradeId) {
      return $http.post('/trades/decline', tradeId);
    }
    
    return {
      show:show,
      tradeYes:tradeYes,
      tradeNo:tradeNo
    };
  }]);
