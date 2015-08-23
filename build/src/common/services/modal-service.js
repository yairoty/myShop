(function(module) {

  module.service('modalService', modalService);

  function modalService($modal) {

    var modalDefaults = {
      backdrop: true,
      keyboard: true,
      modalFade: true,
      templateUrl: 'common/templates/default-modal.tpl.html',
      windowTemplateUrl: 'common/templates/default-modal-window.tpl.html'
    };

    var modalOptions = {
      closeButtonText: 'Close',
      actionButtonText: 'OK',
      headerText: 'Proceed?',
      bodyText: 'Perform this action?'
    };

    this.showModal = function(customModalDefaults, customModalOptions) {
      if (!customModalDefaults) {
        customModalDefaults = {};
      }
      customModalDefaults.backdrop = 'static';
      return this.show(customModalDefaults, customModalOptions);
    };

    this.show = function(customModalDefaults, customModalOptions) {
      //Create temp objects to work with since we're in a singleton service
      var tempModalDefaults = {};
      var tempModalOptions = {};

      //Map angular-ui modal custom defaults to modal defaults defined in service
      angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

      //Map modal.html $scope custom properties to defaults defined in service
      angular.extend(tempModalOptions, modalOptions, customModalOptions);

      if (!tempModalDefaults.controller) {
        /* @ngInject */
        tempModalDefaults.controller = function($scope, $modalInstance) {
          $scope.modalOptions = tempModalOptions;
          $scope.modalOptions.ok = function(result) {
            $modalInstance.close(result);
          };
          $scope.modalOptions.close = function(result) {
            $modalInstance.dismiss('cancel');
          };
        };
        tempModalDefaults.controller.$inject = ['$scope', '$modalInstance'];
      }

      return $modal.open(tempModalDefaults).result;
    };

  }
  modalService.$inject = ['$modal'];

})(angular.module('web-app'));
