(function(module) {
  'use strict';

  module.controller('productCardCtrl', productCardCtrl);

  function productCardCtrl() {

    var vm = this;

    init();

    function init() {
      console.log(vm.item);
    }
  }
})(angular.module('web-app'));

