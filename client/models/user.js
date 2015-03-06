'use strict';

angular.module('game-swap')
  .factory('User', ['$http', '$rootScope', function($http, $rootScope){
    function register(user) {
      return $http.post('/users', user);
    }
    function login(user) {
      return $http.post('/authenticate', user);
    }
    function logout() {
      console.log('LOGOUT');
      delete $rootScope.userId;
      delete $rootScope.userName;
      return $http.delete('/logout');
    }
    function status() {
      return $http.get('/status');
    }
    return {register:register, login:login, logout:logout, status:status};
  }]);
