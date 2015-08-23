(function (module) {
  'use strict';
  module.directive('verticalNav', verticalNav);

  function verticalNav() {
    return {
      scope: {
        list:'=',
        customClass:'@',
        onSelect:'&',
        titleProp:'@'
      },
      restrict: 'E',
      controller: 'verticalNavCtrl',
      controllerAs: 'vm',
      bindToController: true,
      templateUrl: 'common/component/vertical-nav/vertical-nav.tpl.html',
      replace: true
    };
  }
})(angular.module('web-app'));
