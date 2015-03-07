'use strict';

angular.module('game-swap')
  .controller('TradesCtrl', ['$scope', '$rootScope', '$state', 'Trade', function($scope, $rootScope, $state, Trade) {
    Trade.show().then(function(response) {
      $scope.trades = response.data;
    });
  }]);