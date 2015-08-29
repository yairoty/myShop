/**
 * Created by MRX on 22/08/2015.
 */
(function(module){
  'use strict';
  module.factory('loginSrv', loginSrv);

  function loginSrv($http, constants){

    function validate(name, pass){
      //TODO create token interceptor

      return $http.post(constants.URL.basePath + '/authentication',
        { 'usrName' : name, 'usrPass':pass }).then(function(respone){
          return respone.data;
        });
    }

    return {
      validate : validate
    };
  }

})(angular.module('web-app'));
