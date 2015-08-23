(function (module) {
  'use strict';
  module.directive('productCard', productCard);

  function productCard() {
    return {
      scope: {},
      restrict: 'E',
      controller: 'productCardCtrl',
      controllerAs: 'vm',
      bindToController: true,
      templateUrl: 'common/component/product-card/product-card.tpl.html',
      replace: true
    };
  }
})(angular.module('web-app'));
