angular.module('templates-app', ['app.tpl.html', 'common/component/product-card/product-card.tpl.html', 'common/component/vertical-nav/vertical-nav.tpl.html', 'library/library.tpl.html', 'login-screen/login-screen.tpl.html']);

angular.module("app.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app.tpl.html",
    "<div class=\"main-wrapper\" >\n" +
    "    <section class=\"content-area\">\n" +
    "        <header class=\"header\">\n" +
    "            <h1>shop-app</h1>\n" +
    "        </header>\n" +
    "        <div ui-view></div>\n" +
    "    </section>\n" +
    "</div>");
}]);

angular.module("common/component/product-card/product-card.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/component/product-card/product-card.tpl.html",
    "");
}]);

angular.module("common/component/vertical-nav/vertical-nav.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/component/vertical-nav/vertical-nav.tpl.html",
    "<div class=\"btn-group\" ng-class=\"$parent.vm.customClass\"\n" +
    "     ng-repeat=\"category in vm.list\">\n" +
    "    <!--TODO: angular 1.3.18 bug? $parent needed to get to this-->\n" +
    "    <label class=\"btn side-navbar-item\"\n" +
    "           ng-model=\"vm.navbarSelected\"\n" +
    "           btn-radio=\"{{category}}\"\n" +
    "           ng-click=\"vm.contentContainer = category\">\n" +
    "            <!--TODO: angular 1.3.18 bug? $parent needed to get to this-->\n" +
    "            {{category[$parent.vm.titleProp]}}\n" +
    "    </label>\n" +
    "</div>");
}]);

angular.module("library/library.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("library/library.tpl.html",
    "<div class=\"library-container\">\n" +
    "    <h2 class=\"library-title\">library</h2>\n" +
    "    <section class=\"side-navbar\">\n" +
    "        <div>\n" +
    "            <div class=\"side-navbar-title\"><h2>Categoreis</h2></div>\n" +
    "            <vertical-nav\n" +
    "                    custom-class=\"side-navbar-container\"\n" +
    "                    on-select=\"vm.onSelect(selected)\"\n" +
    "                    title-prop=\"displayName\"\n" +
    "                    list=\"vm.categories\">\n" +
    "            </vertical-nav>\n" +
    "        </div>\n" +
    "    </section>\n" +
    "    <section class=\"content\">\n" +
    "        <!-- yair: move to directive -->\n" +
    "        <div class=\"content-container\" ng-model=\"vm.contentContainer\">\n" +
    "            <div ng-repeat=\"product in vm.contentContainer.products\"\n" +
    "                    class=\"product-card\">\n" +
    "                <h5 class=\"card-header\">{{product.displayName}}</h5>\n" +
    "                <div class=\"btn-group card-list\"\n" +
    "                     ng-repeat=\"item in product.subProducts\">\n" +
    "                    <label class=\"btn side-navbar-item\"\n" +
    "                           ng-model=\"vm.navbarSelected\"\n" +
    "                           btn-radio=\"{{item}}\"\n" +
    "                           ng-click=\"vm.contentContainer = vm.navbarSelected\">\n" +
    "                        {{item}}\n" +
    "                    </label>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </section>\n" +
    "</div>\n" +
    "");
}]);

angular.module("login-screen/login-screen.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("login-screen/login-screen.tpl.html",
    "<div class=\"login-screen-container\">\n" +
    "\n" +
    "    <h2 class=\"login-screen-header\">Log In</h2>\n" +
    "\n" +
    "    <div class=\"login-screen-form\">\n" +
    "        <form class=\"form-horizontal\"\n" +
    "              name=\"vm.loginForm\"\n" +
    "              novalidate>\n" +
    "\n" +
    "            <div class=\"form-group\"\n" +
    "                 ng-class=\"{'has-error': vm.loginForm.usrName.$invalid && vm.loginForm.usrName.$dirty}\">\n" +
    "                <label class=\"control-label\">User Name</label>\n" +
    "                <input type=\"text\"\n" +
    "                       class=\"form-control invalid-input\"\n" +
    "                       name=\"usrName\"\n" +
    "                       ng-model=\"vm.data.usrName\"\n" +
    "                       ng-pattern=\"/^[A-Za-z0-9-]+$/\"\n" +
    "                       placeholder=\"enter name\"\n" +
    "                       required>\n" +
    "\n" +
    "                <span ng-show=\"vm.loginForm.usrName.$invalid && vm.loginForm.usrName.$dirty\">\n" +
    "                    use single word, text or digits\n" +
    "                </span>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\"\n" +
    "                 ng-class=\"{'has-error': vm.loginForm.usrPass.$invalid && vm.loginForm.usrPass.$dirty}\">\n" +
    "                <label class=\"control-label\">Password</label>\n" +
    "                <input type=\"password\"\n" +
    "                       class=\"form-control\"\n" +
    "                       ng-class=\"{'invalid-input': vm.loginForm.usrPass.$invalid && vm.loginForm.usrPass.$dirty}\"\n" +
    "                       name=\"usrPass\"\n" +
    "                       ng-model=\"vm.data.usrPass\"\n" +
    "                       ng-pattern=\"/^[A-Za-z0-9-]+$/\"\n" +
    "                       placeholder=\"enter password\"\n" +
    "                       required>\n" +
    "                <span ng-show=\"vm.loginForm.usrPass.$invalid && vm.loginForm.usrPass.$dirty\">\n" +
    "                    use single word, text or digits\n" +
    "                </span>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "    <div class=\"login-screen-btn\">\n" +
    "\n" +
    "        <button type=\"submit\"\n" +
    "                class=\"form-group btn\"\n" +
    "                ng-click=\"vm.validateUsr()\"\n" +
    "                ng-disabled=\"!vm.loginForm.$valid\">\n" +
    "            <label>Submit</label>\n" +
    "        </button>\n" +
    "    </div>\n" +
    "</div>");
}]);
