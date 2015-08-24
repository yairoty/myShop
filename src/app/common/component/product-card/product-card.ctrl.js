(function(module) {
  'use strict';

  module.controller('productCardCtrl', productCardCtrl);

  function productCardCtrl() {

    var vm = this,
        onSelectAction;

    vm.onSelect = onSelect;
    vm.cardAction = cardAction;
    vm.addCard = addCard;

    init();

    function init() {
      onSelectAction='default';
      console.log(vm.titleProp);
    }

    function onSelect(object){
      //TODO: default --> open modal
      switch (onSelectAction){

        case 'default':
          //showModal(object.option);
          defaultOnSelectAction();
          break;

        case 'edit':
          editCard(object.option);
          defaultOnSelectAction();
          break;

        case 'delete':
          deleteCard(object.option, object.ind);
          defaultOnSelectAction();
          break;
      }

      onSelectAction = 'default';
    }

    function defaultOnSelectAction(){
      onSelectAction = 'default';
    }

    function cardAction(action){
      onSelectAction = action;
    }

    function editCard(entity){
      //TODO open modal
    }

    function addCard(){
      var vanilaObj = {
        uId: null,
        name: 'new entity',
        price: 0
      };

      vm.item.subProducts.push(vanilaObj);
      //TODO open modal
      defaultOnSelectAction();
    }

    function deleteCard(entity, ind){
      //if persistence case
      if(entity.uId){
        _.remove(vm.item.subProducts, function(target) {
          return target.uId === entity.uId;
        });
      }else{
        //vm.itemIdx
        vm.item.subProducts.splice(ind, 1);
      }

    }
  }
})(angular.module('web-app'));

