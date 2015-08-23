(function(module) {
  'use strict';

  module.controller('verticalNavCtrl', verticalNavCtrl);

  function verticalNavCtrl() {

    var vm = this;
    vm.displayTitle = displayTitle;

    init();

    function init() {
      console.log(vm.list);
    }

    function displayTitle(object){
      return vm.titleProp ? object[vm.titleProp]: object;
    }
  }
})(angular.module('web-app'));
