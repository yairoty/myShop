(function(app) {
  'use strict';

  app.config(appConfig);

  function appConfig($stateProvider,
                     $urlRouterProvider,
                     DSProvider,
                     cfpLoadingBarProvider) {

    cfpLoadingBarProvider.includeSpinner = true;
    cfpLoadingBarProvider.includeBar = false;
    cfpLoadingBarProvider.latencyThreshold = 100;

    DSProvider.defaults = {
      basePath: 'rest/experimental',
      log: false,
      error: false,
      useClass: true,
      findInverseLinks: false,
      findHasMany: false,
      findBelongsTo: false,
      deserialize: function(resource, response) {

        if (resource.name === 'Category' && response.config.method === 'GET') {
          return response.data;
        }

        return response.data;
      }
    };

    $stateProvider.state('app', {
      abstract: true,
      templateUrl: 'app.tpl.html'
    }).state('app.login', {
      parent: 'app',
      url: '/login',
      template: '<login-screen></login-screen>'
    }).state('app.library', {
      parent: 'app',
      url: '/library',
      template: '<library></library>'
    }).state('app.library.item', {
      parent: 'app',
      url: '/library/item',
      template: '<div><h1>library item screen</h1></div>'
    });

    $urlRouterProvider.otherwise('/login');
  }

  app.run(function() {
  });

}
(angular.module('web-app', ['templates-app',
                            'templates-common',
                            'ngAnimate',
                            'ngSanitize',
                            'ui.bootstrap',
                            'ui.router',
                            'ui.layout',
                            'bgDirectives',
                            'angular-loading-bar',
                            'js-data',
                            'flow'])));


