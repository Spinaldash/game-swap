'use strict';

angular.module('game-swap', ['ui.router'])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('home', {url:'/', templateUrl:'/views/general/home.html'})
      .state('register', {url:'/register', templateUrl:'/views/users/users.html', controller:'UsersCtrl'})
      .state('login', {url:'/login', templateUrl:'/views/users/users.html', controller:'UsersCtrl'})

      .state('items', {url:'/items', templateUrl:'/views/items/items.html', abstract:true})
      .state('items.new', {url:'/new', templateUrl:'/views/items/items_new.html', controller:'ItemsCtrl'})
      .state('items.show', {url:'/{itemId}', templateUrl:'/views/items/items_show.html', controller:'ItemsCtrl'})
      .state('items.index', {url:'/', templateUrl:'/views/items/items_index.html', controller:'ItemsCtrl'})
      .state('items.inventory', {url:'/inventory', templateUrl:'/views/items/items_inventory.html', controller:'ItemsCtrl'});
  }])
  .run(['$rootScope', 'User', function($rootScope, User){
    User.status().then(function(response){
      $rootScope.userName = response.data.userName;
      $rootScope.userId = response.data.userId;
    });
  }]);