'use strict';

angular.module('game-swap')
  .controller('ItemsCtrl', ['$scope', '$rootScope', '$state', 'Item', function($scope, $rootScope, $state, Item) {

    if($state.current.name === 'items.show') {
      Item.showItem().then(function(response) {
        $scope.item = response.data;
      });
    }

    // if($state.current.name === 'items.new') {
    $scope.submit = function(item){
      Item.create(item).then(function(){
        $state.go('items.inventory');
      },function() {
        console.log('Item Create Failed.');
      });
    }
    // }

    if($state.current.name === 'items.index') {


      
    }

    if($state.current.name === 'items.inventory') {
      Item.showInventory().then(function(response) {
        $scope.items = response.data;
      });
    }

  }]);