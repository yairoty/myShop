(function(module) {
  'use strict';

  module.controller('libraryCtrl', libraryCtrl);

  function libraryCtrl(DS) {

    var vm = this;

    init();

    function init() {
      DS.findAll('Category').then(function(response){
        vm.categories = response;
      });
    }
  }
  libraryCtrl.$inject = ['DS'];
})(angular.module('web-app'));

