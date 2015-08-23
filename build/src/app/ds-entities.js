(function(module) {
  'use strict';

  module.run(['DS', function(DS) {

    var category = DS.defineResource({
      name: 'Category',
      endpoint: 'category',
      idAttribute: 'uId'
    });

    var products = DS.defineResource({
      name: 'Products',
      endpoint: 'products',
      idAttribute: 'uId',
      relations: {
        belongsTo: {
          Formula: {
            parent: true,
            localField: 'category',
            localKey: 'uId'
          }
        }
      }
    });

  }]);

}(angular.module('web-app')));

