'use strict';

angular.module('game-swap')
  .controller('NavCtrl', ['$scope', '$rootScope', '$state', 'User', function($scope, $rootScope, $state, User){
    // $scope.logout = function() {
    //   User.logout().then(function(){
    //     delete $rootScope.email;
    //     $state.go('home');
    //   });
    // };
  }]);