(function(module) {
  'use strict';

  module.controller('verticalNavCtrl', verticalNavCtrl);

  function verticalNavCtrl() {

    var vm = this;
    /*vm.showTitle = showTitle;*/

    init();

    function init() {
      console.log(vm.customClass, vm.titleProp);
    }
  }
})(angular.module('web-app'));

