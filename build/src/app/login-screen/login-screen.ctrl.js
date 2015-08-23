(function(module) {
  'use strict';

  module.controller('loginScreenCtrl', loginScreenCtrl);

  function loginScreenCtrl(loginSrv, $state) {

    var vm = this;

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
          }
        });
    }
  }
  loginScreenCtrl.$inject = ['loginSrv', '$state'];
})(angular.module('web-app'));

