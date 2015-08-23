(function (module) {
  'use strict';
  module.directive('library', library);

  function library() {
    return {
      scope: {},
      restrict: 'E',
      controller: 'libraryCtrl',
      controllerAs: 'vm',
      bindToController: true,
      templateUrl: 'library/library.tpl.html',
      replace: true
    };
  }
})(angular.module('web-app'));
