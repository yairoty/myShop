(function(module) {
  'use strict';

  module.controller('productCardCtrl', productCardCtrl);

  function productCardCtrl(modalService) {

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
      switch (onSelectAction){
        case 'default':
          showModal(object.option, false);
          defaultOnSelectAction();
          break;

        case 'edit':
          editCard(object.option);
          break;

        case 'delete':
          deleteCard(object.option, object.ind);
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
      showModal(entity, true);
    }

    function addCard(){
      var vanilaObj = {
        uId: 'tempID_'+tempId++,
        name: 'new entity',
        price: 0
      };
      showModal(vanilaObj, true);
      vm.item.subProducts.push(vanilaObj);
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

    function showModal(object, editMode){
      return  modalService.showModal({
        backdrop: true,
        backdropClass: 'light-opacity',
        keyboard: true,
        modalFade: true,
        controller: 'subProductModal',
        controllerAs: 'vm',
        templateUrl: 'common/component/sub-product-modal/sub-product-modal.tpl.html',
        resolve: {
          modalOptions: function() {
            return {
              data: object,
              editMode:editMode
            };
          }
        }
      });
    }
  }
})(angular.module('web-app'));

