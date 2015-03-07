'use strict';

angular.module('game-swap')
  .controller('TradesCtrl', ['$scope', '$rootScope', '$state', 'Trade', function($scope, $rootScope, $state, Trade) {
    Trade.show().then(function(response) {
      $scope.trades = response.data;
    });

    $scope.declineTrade = function(trade) {
      Trade.declineTrade(trade._id).then(function() {
        Trade.show().then(function(response) {
          $scope.trades = response.data;
        });
      });
    };

    $scope.approveTrade = function(trade) {
      Trade.approveTrade(trade._id).then(function() {
        Trade.show().then(function(response) {
          $scope.trades = response.data;
        });
      });
    };

    $scope.item1filter = function(trade) {
      if(trade.user1._id === $rootScope.userId && !trade.isCompleted) {
        return true;
      } else {
        return false;
      }
    };

    $scope.item2filter = function(trade) {
      if(trade.user2._id === $rootScope.userId && !trade.isCompleted) {
        return true;
      } else {
        return false;
      }
    };

    $scope.historyfilter = function(trade) {
      if(((trade.user1._id === $rootScope.userId) || (trade.user2._id === $rootScope.userId)) && trade.isSuccess) {
        return true;
      } else {
        return false;
      }
    };
  }]);
