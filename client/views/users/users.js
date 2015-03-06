'use strict';

angular.module('game-swap')
  .controller('UsersCtrl', ['$scope', '$rootScope', '$state', 'User', function($scope, $rootScope, $state, User){
    $scope.name = $state.current.name;
    $scope._ = _;
    $scope.submit = function(user){
      if($scope.name === 'register') {
        if((user.password1 === user.password2) && (user.email)) {
          User.register({userName:user.userName, email:user.email, password:user.password1})
          .then(function(){
            $state.go('login');
          }, function(){
            user.email = user.userName = user.password1 = user.password2 = '';
          });
        }else{
          alert('Non-matching passwords.');
          user.password1 = user.password2 = '';
        }
      } else {
        User.login(user).then(function(response) {
          $rootScope.userName = response.data.userName;
          $rootScope.userId = response.data.userId;
          $state.go('home');
        }, function() {
          user.userName = user.password = '';
        });
      }
    };
  }]);
