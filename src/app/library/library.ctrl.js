(function(module) {
  'use strict';

  module.controller('libraryCtrl', libraryCtrl);

  function libraryCtrl(DS, $scope) {

    var vm = this;

    vm.cardList = undefined;

    vm.usrActivate = usrActivate;
    vm.onSelect = onSelect;

    init();

    function init() {
      DS.findAll('Category').then(function(response){
        //TODO use DS.loadRelations ?
        vm.categories = response;
      });
    }

    function usrActivate($element){

    }

    function onSelect(option){
      vm.cardObject = option.option;
    }
  }
})(angular.module('web-app'));

