/**
 * Created by yaira on 24/08/15.
 */
/**
 * Created by yaira on 22/03/15.
 */
//yair: split filters to files
(function(module) {

  module.filter('getContstant', function(constants) {
    return function(value) {
      var pathSplitted = value.split('.'),
          result;

      angular.forEach(pathSplitted, function(node) {
        result = constants[node] ? constants[node] : result[node];
      });
      return result || '';
    };
  });



})(angular.module('web-app'));

