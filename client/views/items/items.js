'use strict';

angular.module('game-swap')
  .controller('ItemsCtrl', ['$scope', '$rootScope', '$state', 'Item', function($scope, $rootScope, $state, Item) {

    if($state.current.name === 'items.show') {
      Item.showItem($state.params.itemId).then(function(response) {
        $scope.item = response.data.item;
        $scope.userName = response.data.userName;
      });
    }

    // if($state.current.name === 'items.new') {
    $scope.submit = function(item){
      Item.create(item).then(function(){
        $state.go('items.inventory');
      },function() {
        console.log('Item Create Failed.');
      });
    };
    // }

    if($state.current.name === 'items.index') {
      Item.showIndex().then(function(response) {
        $scope.items = response.data;
      });
    }

    if($state.current.name === 'items.inventory') {
      Item.showInventory().then(function(response) {
        $scope.items = response.data;
      });
    }

  }]);