(function (module) {
  'use strict';
  module.directive('loginScreen', loginScreen);

  function loginScreen() {
    return {
      scope: {},
      restrict: 'E',
      controller: 'loginScreenCtrl',
      controllerAs: 'vm',
      bindToController: true,
      templateUrl: 'login-screen/login-screen.tpl.html',
      replace: true
    };
  }
})(angular.module('web-app'));
