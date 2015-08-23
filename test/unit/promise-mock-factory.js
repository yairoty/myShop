(function(module) {

  module.factory('promiseMockFactory', ['$q', function($q) {

    return function createInstance(mockName, methodNames) {

      var mock = jasmine.createSpyObj(mockName, methodNames);

      mock.$deferred = {};

      methodNames.forEach(function(methodName) {
        mock.$deferred[methodName] = $q.defer();
        mock[methodName].andReturn(mock.$deferred[methodName]);
      });

      return mock;
    }
  }]);
})(angular.module('self-pack-mocks',[]));
