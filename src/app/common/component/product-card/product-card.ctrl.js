(function(module) {
  'use strict';

  module.controller('productCardCtrl', productCardCtrl);

  function productCardCtrl() {

    var vm = this,
        onSelectAction,
        tempId;

    vm.listIcon='';

    vm.onSelect = onSelect;
    vm.cardAction = cardAction;
    vm.addCard = addCard;

    init();

    function init() {
      onSelectAction='default';
      tempId=0;
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
    }

    function defaultOnSelectAction(){
      onSelectAction = 'default';
      vm.listIcon='';
    }

    function cardAction(action){
      if(onSelectAction === action){
        defaultOnSelectAction();
      }else{
        onSelectAction = action;
        if(action === 'delete'){
          vm.listIcon='glyphicon-remove-circle';
        }else if(action === 'edit'){
          vm.listIcon='glyphicon-pencil';
        }


      }
    }

    function editCard(entity){
      //TODO open modal
    }

    function addCard(){
      var vanilaObj = {
        uId: 'tempID_'+tempId++,
        name: 'new entity',
        price: 0
      };

      vm.item.subProducts.push(vanilaObj);
      //TODO open modal
      defaultOnSelectAction();
    }

    function deleteCard(entity, ind){
      //if persistence case:
      if(entity.uId){
        _.remove(vm.item.subProducts, function(target) {
          return target.uId === entity.uId;
        });
      }else{
        vm.item.subProducts.splice(ind, 1);
      }
    }
  }
})(angular.module('web-app'));

