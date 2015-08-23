(function(module) {
  'use strict';

  module.controller('productCardCtrl', productCardCtrl);

  function productCardCtrl() {

    var vm = this,
        onSelectAction;

    vm.onSelect = onSelect;
    vm.removeCard = removeCard;
    vm.addCard = addCard;
    vm.editCard = editCard;

    init();

    function init() {
    }

    function onSelect(object){
      //TODO: default - show Modal
      switch (onSelectAction){
        case 'edit':

          break;

        case 'delete':

          break;
      }

      onSelectAction = 'default';
    }

    function editCard(){
      onSelectAction = 'edit';
    }

    function addCard(){

    }

    function removeCard(){
      onSelectAction = 'delete';
    }
  }
})(angular.module('web-app'));

