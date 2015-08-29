angular.module('templates-app', ['app.tpl.html', 'common/component/product-card/product-card.tpl.html', 'common/component/sub-product-modal/sub-product-modal.tpl.html', 'common/component/vertical-nav/vertical-nav.tpl.html', 'common/templates/default-modal-window.tpl.html', 'common/templates/default-modal.tpl.html', 'common/templates/popover-firewall.tpl.html', 'library/library.tpl.html', 'login-screen/login-screen.tpl.html']);

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
    "<div class=\"product-card\">\n" +
    "    <h3 class=\"card-header\">{{vm.item.displayName}}</h3>\n" +
    "\n" +
    "    <div class=\"utils-bar\">\n" +
    "        <button class=\"btn\"\n" +
    "                ng-click=\"vm.cardAction('delete')\">\n" +
    "            <span class=\"glyphicon glyphicon-minus\"></span>\n" +
    "        </button>\n" +
    "        <button class=\"btn\"\n" +
    "                ng-click=\"vm.addCard()\">\n" +
    "            <span class=\"glyphicon glyphicon-plus\"></span>\n" +
    "        </button>\n" +
    "        <button class=\"btn\"\n" +
    "                ng-click=\"vm.cardAction('edit')\">\n" +
    "            <span class=\"glyphicon glyphicon-pencil\"></span>\n" +
    "        </button>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"btn-group card-list\">\n" +
    "        <vertical-nav\n" +
    "                custom-class=\"card-list\"\n" +
    "                title-prop=\"{{vm.titleProp}}\"\n" +
    "                on-select=\"vm.onSelect(option)\"\n" +
    "                list=\"vm.item.subProducts\"\n" +
    "                action-icon=\"vm.listIcon\">\n" +
    "        </vertical-nav>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("common/component/sub-product-modal/sub-product-modal.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/component/sub-product-modal/sub-product-modal.tpl.html",
    "<div class=\"subproduct-contianer\">\n" +
    "    <labe class=\"subproduct-dismiss-btn\"\n" +
    "            ng-click=\"vm.dismiss()\">\n" +
    "        <span class=\"glyphicon glyphicon-remove-circle\"></span>\n" +
    "    </labe>\n" +
    "\n" +
    "    <div class=\"subproduct-header\">\n" +
    "        <h2 ng-if=\"!vm.isEditMode\">{{vm.data.name}}</h2>\n" +
    "        <input ng-if=\"vm.isEditMode\"\n" +
    "               type=\"text\"\n" +
    "               ng-model=\"vm.data.name\"\n" +
    "               placeholder=\"enter name\">\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"subproduct-price\">\n" +
    "        <span ng-if=\"!vm.isEditMode\">price: {{vm.data.price}} NIS</span>\n" +
    "        <input ng-if=\"vm.isEditMode\"\n" +
    "           type=\"text\"\n" +
    "           ng-model=\"vm.data.price\"\n" +
    "           placeholder=\"enter price\">\n" +
    "        <span ng-if=\"vm.isEditMode\">NIS</span>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "    <div class=\"img-placholder\">\n" +
    "        <span class=\"glyphicon glyphicon-camera\"></span>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("common/component/vertical-nav/vertical-nav.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/component/vertical-nav/vertical-nav.tpl.html",
    "<div class=\"btn-group\" ng-class=\"$parent.vm.customClass\"\n" +
    "     ng-repeat=\"category in vm.list | filter: vm.filterKey\">\n" +
    "    <!--TODO: angular 1.3.18 bug? $parent needed to get to this-->\n" +
    "    <label class=\"btn side-navbar-item\"\n" +
    "           ng-model=\"vm.navbarSelected\"\n" +
    "           btn-radio=\"{{category}}\"\n" +
    "           ng-click=\"vm.onSelect({option: category, ind:$index})\">\n" +
    "            <!--TODO: angular 1.3.18 bug? $parent needed to get to this-->\n" +
    "            {{$parent.vm.displayTitle(category)}}\n" +
    "        <span class=\"glyphicon\" ng-class=\"$parent.vm.actionIcon\"></span>\n" +
    "    </label>\n" +
    "</div>");
}]);

angular.module("common/templates/default-modal-window.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/templates/default-modal-window.tpl.html",
    "<div modal-render=\"{{$isRendered}}\" tabindex=\"-1\" role=\"dialog\" class=\"modal\"\n" +
    "     modal-animation-class=\"fade\"\n" +
    "     ng-class=\"{in: animate}\"\n" +
    "     ng-style=\"{'z-index': 1050 + index*10, display: 'block'}\"\n" +
    "     ng-click=\"close($event)\">\n" +
    "  <div class=\"modal-dialog\" ng-class=\"size ? 'modal-' + size : ''\">\n" +
    "    <div class=\"modal-content\" modal-transclude></div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("common/templates/default-modal.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/templates/default-modal.tpl.html",
    "<div class=\"modal-header default-modal\">\n" +
    "    <h3>{{modalOptions.headerText}}</h3>\n" +
    "     <i class=\"glyphicon glyphicon-remove-circle\" ng-click=\"modalOptions.close()\"></i>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "    <span>{{modalOptions.bodyText}}</span>\n" +
    "</div>\n" +
    "<div class=\"modal-footer default-modal\">\n" +
    "    <button type=\"submit\" class=\"btn btn-info\" ng-click=\"modalOptions.ok()\">\n" +
    "        {{modalOptions.actionButtonText}}\n" +
    "    </button>\n" +
    "    <button type=\"submit\" class=\"btn btn-default\" ng-click=\"modalOptions.close()\">\n" +
    "        {{modalOptions.closeButtonText}}\n" +
    "    </button>\n" +
    "</div>\n" +
    "");
}]);

angular.module("common/templates/popover-firewall.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/templates/popover-firewall.tpl.html",
    "<div class=\"popover firewall\">\n" +
    "  <div class=\"popover-title\">Firewall Rules</div>\n" +
    "  <div class=\"popover-content\">\n" +
    "    <firewall-rules></firewall-rules>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("library/library.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("library/library.tpl.html",
    "<div class=\"library-container\">\n" +
    "    <h2 class=\"library-title\">Library</h2>\n" +
    "    <section class=\"side-navbar\">\n" +
    "        <div>\n" +
    "            <div class=\"side-navbar-title\"><h2>Categoreis</h2></div>\n" +
    "            <vertical-nav\n" +
    "                    custom-class=\"side-navbar-container\"\n" +
    "                    on-select=\"vm.onSelect(option)\"\n" +
    "                    title-prop=\"displayName\"\n" +
    "                    list=\"vm.categories\">\n" +
    "            </vertical-nav>\n" +
    "            <div class=\"side-navbar-actions\">\n" +
    "                <label class=\"btn side-navbar-btn\"\n" +
    "                       ng-click=\"vm.addCategory()\">\n" +
    "                    Add Category\n" +
    "                </label>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </section>\n" +
    "\n" +
    "    <section class=\"content\">\n" +
    "        <div class=\"content-container\" ng-repeat=\"content in vm.cardObject.products\">\n" +
    "            <product-card\n" +
    "                    item=\"content\"\n" +
    "                    title-prop=\"name\"\n" +
    "                    entity=\"{{'ENTITY.SubProducts' | getContstant}}\">\n" +
    "            </product-card>\n" +
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
    "            <div class=\"alert-bar alert-danger\"\n" +
    "                 ng-show=\"vm.showAuthError\">Wrong Password or User Name</div>\n" +
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
