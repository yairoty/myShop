/**
 * Created by MRX on 29/08/2015.
 */
(function(module){
  module.factory('metaDataSrv',metaDataSrv);

  function metaDataSrv($http, constants){

    //TODO: implement a cache mechanizem

    function getCategory(){
      return $http.get(constants.URL.basePath + '/category')
        .then(function(respone){
          return respone.data;
        });
    }
    return {
      getCategory : getCategory
    };
  }
})(angular.module('web-app'));