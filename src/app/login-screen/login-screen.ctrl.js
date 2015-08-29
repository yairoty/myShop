(function(module) {
  'use strict';

  module.controller('loginScreenCtrl', loginScreenCtrl);

  function loginScreenCtrl(loginSrv, $state) {

    var vm = this;

    vm.showAuthError = false;

    vm.validateUsr = validateUsr;

    init();

    function init() {
    }

    function validateUsr(){
      loginSrv.validate(vm.data.usrName , vm.data.usrPass)
        .then(function(response){
          if(response.isAuthValid){
            $state.go('app.library');
          }else{
            $state.go('app.login');
            vm.showAuthError = true;
          }
        });
    }
  }
})(angular.module('web-app'));

