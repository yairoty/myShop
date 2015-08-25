/**
 * Created by MRX on 24/08/2015.
 */


(function (module) {
    'use strict';
    module.controller('subProductModal', subProductModal);

    function subProductModal(modalOptions , $modalInstance) {
        var vm = this;

        vm.dismiss= dismiss;
        init();

        function init(){
            vm.data = modalOptions.data;
            vm.isEditMode = modalOptions.editMode;
          }

        function dismiss() {
            $modalInstance.dismiss();
          }

        function close(){
            $modalInstance.close();
          }
      }
  })(angular.module('web-app'));