(function(module) {
  'use strict';

  module.controller('libraryCtrl', libraryCtrl);

  function libraryCtrl(DS) {

    var vm = this;

    vm.usrActivate = usrActivate;

    init();

    function init() {
      DS.findAll('Category').then(function(response){
        vm.categories = response;
      });
    }

    function usrActivate($element){
      console.log($element);
    }
  }
})(angular.module('web-app'));

