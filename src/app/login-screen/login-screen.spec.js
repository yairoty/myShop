describe('controllers', function() {

  beforeEach(module('web-app'));

  describe('loginScreen', function() {

    var ctrl,
        $controller,
        $scope    ;


    beforeEach(inject(['$controller', '$rootScope',
      function(_$controller_, _$rootScope_) {
        $controller = _$controller_;
        $scope = _$rootScope_.$new();



        ctrl = $controller('loginScreenCtrl', {
          $scope: $scope
        });

        ctrl.data = [];

      }
    ]));

    describe('it should init the controller', function() {

      Then(function() {
        expect(ctrl).toBeTruthy();
      });
    });
  });
});
