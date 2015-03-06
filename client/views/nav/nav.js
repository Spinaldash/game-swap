'use strict';

angular.module('game-swap')
  .controller('NavCtrl', ['$scope', '$state', 'User', function($scope, $state, User){
    $scope.logout = function() {
      User.logout().then(function(){
        $state.go('home');
      });
    };
  }]);
