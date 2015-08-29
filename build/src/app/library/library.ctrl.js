(function(module) {
  'use strict';

  module.controller('libraryCtrl', libraryCtrl);

  function libraryCtrl(DS, metaDataSrv) {

    var vm = this;

    vm.cardList = undefined;
    vm.fullCategoryList = [];

    vm.usrActivate = usrActivate;
    vm.onSelect = onSelect;
    vm.addCategory = addCategory;

    init();

    function init() {
      DS.findAll('Category').then(function(response){
        vm.categories = response;
      });
    }

    function usrActivate($element){

    }

    function addCategory(){
      showAllCategory();
    }

    function onSelect(option){
      vm.cardObject = option.option;
    }

    function showAllCategory(){
      metaDataSrv.getCategory().then(function(response){
        vm.fullCategoryList = response;
      });
      console.log('showAllCategory fires!');

    }
  }
})(angular.module('web-app'));

