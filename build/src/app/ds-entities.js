(function(module) {
  'use strict';

  module.run(function(DS) {

    var category = DS.defineResource({
      name: 'Category',
      endpoint: 'category',
      idAttribute: 'uId',
      relations:{
        hasMany: {
          Products: {
            localField: 'Products',
            endpoint: 'products',
            foreignKey: 'uId'
          }
        }
      }
    });

    var products = DS.defineResource({
      name: 'Products',
      endpoint: 'products',
      idAttribute: 'uId',
      relations: {
        belongsTo: {
          Category: {
            parent: true,
            localField: 'category',
            localKey: 'uId'
          }
        },
        hasMany: {
          SubProducts: {
            localField: 'SubProducts',
            endpoint: 'subProducts',
            foreignKey: 'uId'
          }
        }
      }
    });

    var subProducts = DS.defineResource({
      name: 'SubProducts',
      endpoint: 'subProducts',
      idAttribute: 'uId',
      relations: {
        belongsTo: {
          Products: {
            parent: true,
            localField: 'products',
            localKey: 'uId'
          }
        }
      }
    });

  });

}(angular.module('web-app')));

