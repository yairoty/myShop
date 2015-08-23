(function(module) {
  'use strict';

  module.controller('productCardCtrl', productCardCtrl);

  function productCardCtrl() {

    var vm = this;

    vm.onSelect = onSelect;
    init();

    function init() {
    }

    function onSelect(object){

    }
  }
})(angular.module('web-app'));

