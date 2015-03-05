'use strict';

angular.module('game-swap')
  .factory('User', ['$http', function($http){
    function register(user) {
      return $http.post('/users', user);
    }
    function login(user) {
      return $http.post('/authenticate', user);
    }
    function logout() {
      console.log('LOGOUT');
      return $http.delete('/logout');
    }
    function status() {
      return $http.get('/status');
    }
    return {register:register, login:login, status:status};
  }]);
