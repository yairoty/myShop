(function(module) {
  'use strict';

  module.controller('libraryCtrl', libraryCtrl);

  function libraryCtrl(DS) {

    var vm = this;

    vm.cardList = undefined;

    vm.usrActivate = usrActivate;
    vm.onSelect = onSelect;

    init();

    function init() {
      DS.findAll('Category').then(function(response){
        vm.categories = response;
      });
    }

    function usrActivate($element){

    }

    function onSelect(option){
      vm.cardList = option.option.products;
    }
  }
})(angular.module('web-app'));

